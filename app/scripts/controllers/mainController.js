'use strict';

angular.module('roseStClient').controller('MainController', function ($scope, $modal, $route, $window, $routeParams, $rootScope, AuthFactory, PostFactory) {
	
	// custom donation button stuff

	$scope.keypressCallback = function ($event) {
		if ($event.which === 27) {
			if ($rootScope.custom[1] === false) {
			$rootScope.custom[1] = true;
			console.log("custom state:", $scope.custom[1])
			} else if ($rootScope.custom[2] === false) {
				$rootScope.custom[2] = true;
			}
			$event.preventDefault();
		}
	};

	$rootScope.custom = {};
	$rootScope.custom[1] = true;
	$rootScope.custom[2] = true;
	$rootScope.toggleCustom = function (id) {
		$rootScope.custom[id] = $rootScope.custom[id] === false ? true : false;
		console.log("custom state:", $rootScope.custom[id])
	};
	
	// functions for posts and adjusting the header according to the route

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
		if ($route.current.$$route.originalPath === "/post/:post") {
			return true;
		}
	};

	$scope.atDonation = function () {
		if ($route.current.$$route.originalPath === "/donate") {
			return true;
		}
	};
	
//	console.log("route params:", $routeParams.post)

	if ($routeParams.post) {
		PostFactory.getPost($routeParams.post);
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