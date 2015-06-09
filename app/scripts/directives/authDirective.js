'use strict';

angular.module('roseStClient').directive('loginForm', [function () {

	return {
		restrict: 'E',
		templateUrl: 'views/login.html',
		controller: 'AuthController',
		controllerAs: 'authController',
		bindToController: true,
		scope: {
			credentials: '&'
		}
	};
}]);