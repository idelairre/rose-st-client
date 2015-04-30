'use strict';

angular.module('MainDirective').directive('donateForm', [ function ($scope) {
	return {
		restrict: 'E',
		templateUrl: 'views/donate-form.html',
		controller: 'DonateController',
		controllerAs: 'donateController',
		bindToController: true,
		scope: {
		},
		link: function ($scope, selement, attrs) {
		}
  }
}]);