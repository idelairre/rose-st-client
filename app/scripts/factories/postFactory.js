'use strict';

angular.module('roseStClient').factory('PostFactory', ['$http', function ($http) {
	var posts = [];
	var post = {};
	
	var getPost = function (id) {
		return $http.get('http://localhost:3000/posts/' + id).then(function (response) {
			angular.copy(response.data, post);
			console.log(response.data);
		});
	};

	var getPosts = function () {
		return $http.get('http://localhost:3000/posts/').then(function (response) {
			angular.copy(response.data, posts);
			console.log(response.data);
		});
	};

	var upsertPost = function (post) {
		var params = {
			post: {
				title: post.title,
				body: post.body,
			}
		};
		if (post.id) {
			return $http.patch('http://localhost:3000/posts' + post.id, params).then(function (response) {
				getPosts();
			});
		} else {
			return $http.post('http://localhost:3000/posts', params).then(function (response) {
				getPosts();
			});
		}
	};

	var deletePost = function (id) {
		return $http.delete('http://localhost:3000/posts/' + id).then(function (response) {
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
		deletePost: deletePost
	};
}]);