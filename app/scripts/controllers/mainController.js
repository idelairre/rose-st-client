'use strict';

angular.module('roseStClient').controller('MainController', ['$scope', '$modal', '$route', '$window', '$location', '$routeParams', '$rootScope', 'AuthFactory', 'PostFactory', function ($scope, $modal, $route, $window, $location, $routeParams, $rootScope, AuthFactory, PostFactory) {

	console.log("at main?", $route.current.$$route.originalPath === "/")

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

	//	console.log($route.current.$$route.originalPath === "/")
//	console.log("User ID:", AuthFactory.userId)

	$scope.posts = PostFactory.posts;
	$scope.post = PostFactory.post;
	$scope.title = "Rose St. Community Center";
	$scope.subheading = "100 Blocks Homocide-Free Zone";

	// route watchers

	$scope.$watch(function () {
		return $route.current.$$route.originalPath === "/post/:post";
	}, function (value) {
		$scope.atPost = value;
		if (value == true) {
			PostFactory.getPost($routeParams.post);
			PostFactory.resetPost();
		}
	});

	$scope.$watch(function () {
		return $route.current.$$route.originalPath === "/";
	}, function (value) {
		$scope.atBlog = value;
		if (value == true) {
			PostFactory.getPosts();
		}
	});

	$scope.$watch(function () {
		return $route.current.$$route.originalPath === "/about";
	}, function (value) {
		$scope.atAbout = value;
	});

	// authentication

	$scope.isAuthenticated = function () {
		return AuthFactory.isAuthenticated();
	};

	$scope.upsertPost = function (post, userId) {
		PostFactory.upsertPost(post, userId).then(function (response) {
			PostFactory.resetPost();
		});
	};

	$scope.deletePost = function (postId, postTitleUrl) {
		PostFactory.deletePost(postId, postTitleUrl);
		$scope.$modalInstance.dismiss();
		$location.path("/");
	};

	// modal stuff

	$scope.open = function () {
		$scope.$modalInstance = $modal.open({
			scope: $scope,
			templateUrl: 'views/partials/submit-post-form.html',
			size: 'lg'
		});
	};

	$scope.ok = function () {
		$scope.$modalInstance.close();
	};

	$scope.cancel = function () {
		$scope.$modalInstance.dismiss();
	};

	// pagination

	$scope.pageChangeHandler = function (num) {
		console.log('going to page ' + num);
	};

	$scope.currentPage = 1;

	// authentication stuff

	$scope.credentials = {};
	$scope.userId = AuthFactory.userId;

	$scope.login = function (credentials) {
		console.log("clicked");
		AuthFactory.login(credentials).then(function (response) {
			console.log("user id: ", AuthFactory.userId);
			$window.location.href = '/index.html';
		});
	};

	$scope.logout = function () {
		AuthFactory.logout()
	}
}]);