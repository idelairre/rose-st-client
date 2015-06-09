'use strict';

angular.module('roseStClient').directive('rstNav', [ function () {
	return {
		restrict: 'E',
		templateUrl: 'views/partials/nav.html',
		controller: 'MainController',
		controllerAs: 'mainController',
		bindToController: true
  }
}]);