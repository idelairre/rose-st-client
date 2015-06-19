'use strict';

angular.module('roseStClient').controller('MainController', function ($scope, $modal, $route, $routeParams, AuthFactory, PostFactory) {
	
   $scope.$route = $route;
	
	PostFactory.resetPost();
	PostFactory.getPosts();
//	console.log($route.current.$$route.originalPath === "/")
	console.log("User ID:", AuthFactory.userId)
	
	$scope.posts = PostFactory.posts;
	$scope.post = PostFactory.post;
	$scope.title = "Rose St. Community Center";
	$scope.subheading = "100 Blocks Homocide-Free Zone";
	
	$scope.atPost = function () {
		if ($route.current.$$route.originalPath === "/posts/:id") {
			return true;
		}
	};
	
	$scope.atDonation = function () {
		if ($route.current.$$route.originalPath === "/donate") {
			return true;
		}
	};
	
	if ($routeParams.id) {
		console.log("getting post")
		PostFactory.getPost($routeParams.id);
	}
	// authentication
	
	$scope.isAuthenticated = function () {
		return AuthFactory.isAuthenticated();
	};
	
	$scope.upsertPost = function (post) {
		PostFactory.upsertPost(post).then(function (response) {
			PostFactory.resetPost();
		});
	};
	
	$scope.deletePost = function (postId) {
		PostFactory.deletePost(postId);
	};
	
	// modal stuff

	$scope.open = function () {
		$scope.$modalInstance = $modal.open({
			scope: $scope,
			templateUrl: 'views/partials/submit-post-form.html',
			size: 'lg',
			controller: 'MainController',
			controllerAs: 'mainController'
		});
	};

	$scope.ok = function () {
		$scope.$modalInstance.close();
	};

	$scope.cancel = function () {
		$scope.$modalInstance.dismiss();
	};
});