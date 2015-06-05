'use strict';

angular.module('roseStClient', ['ngAnimate','ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'angularPayments', 'ui.bootstrap', 'textAngular'])
  .config(function ($routeProvider, STRIPE) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
		  controllerAs: 'mainController'
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
