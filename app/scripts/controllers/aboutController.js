'use strict';

/**
 * @ngdoc function
 * @name roseStClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the roseStClientApp
 */
angular.module('roseStClient')
  .controller('AboutController', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
