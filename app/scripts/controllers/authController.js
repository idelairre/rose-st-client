'use strict';

angular.module('roseStClient').controller('AuthController', function ($location, $scope, $window, AuthFactory) {
	console.log("authController loaded")

	$scope.credentials = {};

	var postCredentials = function (credentials) {
		console.log("clicked");
		AuthFactory.login(credentials).then(function (response) {
			console.log("user id: ", response.data.id);
			$location.path('/');
		});
	};

	var login = function () {
		$scope.credentials.email = prompt("email");
		$scope.credentials.password = prompt("password");
		postCredentials($scope.credentials);
	}

	login();

});