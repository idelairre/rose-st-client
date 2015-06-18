'use strict';

angular.module('roseStClient').factory('PostFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
	var posts = [];
	var post = {};

	var resetPost = function () {
		angular.copy({}, post);
	};

	var getPost = function (id) {
		return $http.get(ServerUrl + '/posts/' + id).then(function (response) {
			angular.copy(response.data, post);
			console.log(response.data);
		});
	};

	var getPosts = function () {
		return $http.get(ServerUrl + '/posts/').then(function (response) {
			angular.copy(response.data, posts);
			console.log(response.data);
		});
	};

	var upsertPost = function (post) {
		var params = {
			post: {
				title: post.title,
				body: post.body,
				subheading: post.subheading,
				user_id: AuthFactory.userId
			}
		};
		if (post.id) {
			return $http.patch(ServerUrl + '/posts/' + post.id, params).then(function (response) {
				getPosts();
			});
		} else {
			return $http.post(ServerUrl + '/posts', params).then(function (response) {
				getPosts();
			});
		}
		resetPost();
	};

	var deletePost = function (id) {
		return $http.delete(ServerUrl + '/posts/' + id).then(function (response) {
			posts.splice(findPostIndexById(id), 1);
		});
	};

	var findPostIndexById = function (id) {
		for (var i = 0; i < posts.length; i++) {
			if (posts[i].id === id) {
				return i;
			}
		}
	};

	return {
		getPosts: getPosts,
		getPost: getPost,
		posts: posts,
		post: post,
		upsertPost: upsertPost,
		deletePost: deletePost,
		resetPost: resetPost
	};
}]);