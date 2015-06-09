'use strict';

angular.module('MainDirective').directive('donateForm', [ function ($scope) {
	return {
		restrict: 'E',
		templateUrl: 'views/donate-form.html',
		link: function ($scope, selement, attrs) {
		}
  }
}]);