'use strict';

angular.module('roseStClient').controller('AuthController', function ($location, $scope, AuthFactory) {
	console.log("authController loaded")
	$scope.credentials = {};

	$scope.login = function (credentials) {
		console.log("clicked");
		AuthFactory.login(credentials).then(function (response) {
			console.log("user id: ", response.data.id);
			$location.path('/');
		});
	};

	$scope.register = function (credentials) {
		AuthFactory.register(credentials).then(function (response) {
			$location.path('/');
			console.log("yo", credentials);
		});
	};
});