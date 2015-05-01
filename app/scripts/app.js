'use strict';

/**
 * @ngdoc overview
 * @name roseStClientApp
 * @description
 * # roseStClientApp
 *
 * Main module of the application.
 */
angular.module('roseStClient', ['ngAnimate','ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'angularPayments', 'ui.bootstrap'])
  .config(function ($routeProvider, STRIPE) {
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
		Stripe.setPublishableKey(STRIPE.PUBLISHABLE_KEY);
  });
