'use strict';

angular.module('roseStClient').controller('MainController', function ($scope, $modal, PostFactory) {
	PostFactory.getPosts();
	$scope.posts = PostFactory.posts;
	$scope.post = {};
	
	$scope.upsertPost = function (post) {
		console.log(post)
		PostFactory.upsertPost(post).then(function (response) {
			$scope.post = {};
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