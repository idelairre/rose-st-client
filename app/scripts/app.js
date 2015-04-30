'use strict';

/**
 * @ngdoc overview
 * @name roseStClientApp
 * @description
 * # roseStClientApp
 *
 * Main module of the application.
 */
angular.module('roseStClient', ['ngAnimate','ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'angularPayments'])
  .config(function ($routeProvider, PUBLISHABLE_KEY) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
	 	.when('/donate', {
		 templateUrl: 'views/donate.html',
		 controller: 'DonateController'
	 	})
      .otherwise({
        redirectTo: '/'
      });
		Stripe.setPublishableKey(PUBLISHABLE_KEY);
  });
