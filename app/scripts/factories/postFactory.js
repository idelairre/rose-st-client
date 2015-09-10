'use strict';

angular.module('roseStClient').factory('PostFactory', ['$http', '$window', 'AuthFactory', 'ServerUrl', function ($http, $window, AuthFactory, ServerUrl) {
	var posts = [];
	var post = {};

	var resetPost = function () {
		angular.copy({}, post);
	};

	var getPosts = function () {
		return $http.get(ServerUrl + '/posts/').then(function (response) {
			angular.copy(response.data, posts);
			console.log(response.data);
		});
	};

	var getPost = function (title_url) {
		return $http.get(ServerUrl + '/posts/' + title_url).then(function (response) {
			angular.copy(response.data, post);
		});
	};


	var upsertPost = function (post, userId) {
		var params = {
			post: {
				title: post.title,
				body: post.body,
				subheading: post.subheading,
				user_id: userId,
				title_url: post.title.replace(/\s/g, "-").replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
			}
		};
		if (post.id) {
			return $http.patch(ServerUrl + '/posts/' + post.title_url, params).then(function (response) {
				getPost(post.title_url);
			});
		} else {
			return $http.post(ServerUrl + '/posts', params).then(function (response) {
				getPosts();
			});
		}
	};

	var deletePost = function (id, title_url) {
		console.log("id: ", id, "title url: ", title_url)
		return $http.delete(ServerUrl + '/posts/' + title_url).then(function (response) {
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