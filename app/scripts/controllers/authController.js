'use strict';

angular.module('roseStClient').controller('AuthController', ['$location', '$scope', '$window', '$route', '$modal', 'AuthFactory', function ($location, $scope, $window, $route, $modal, AuthFactory) {
	console.log("authController loaded")

	$scope.credentials = {};

	$scope.postCredentials = function (credentials) {
		console.log("clicked");
		AuthFactory.login(credentials).then(function (response) {
			console.log("user id: ", response.data.id);
			$location.path('/');
			$route.reload();
		});
	};
}]);