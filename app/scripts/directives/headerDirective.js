'use strict';

angular.module('roseStClient').directive('rstHeader', [ function () {
	return {
		restrict: 'E',
		templateUrl: 'views/partials/header.html',
		controller: 'MainController',
		scope: false
  }
}]);