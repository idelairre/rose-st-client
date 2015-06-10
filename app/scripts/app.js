'use strict';

angular.module('roseStClient', ['ngAnimate','ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'angularPayments', 'ui.bootstrap', 'textAngular'])
  .config(function ($routeProvider, STRIPE) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
		  controllerAs: 'mainController'
      })
	 	.when('/posts/:id', {
		 templateUrl: 'views/post.html',
		 controller: 'MainController',
		 controllerAs: 'mainController'
	 	})
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
	 	.when('/donate', {
		 templateUrl: 'views/donate.html',
		 controller: 'DonateController',
		 controllerAs: 'donateController'
	 	})
	 	.when('/contact', {
		 templateUrl: 'views/contact.html'
	 	})
	 	.when('/login', {
		 templateUrl: 'views/login.html',
		 controller: 'AuthController',
		 controllerAs: 'authController'
	   })
      .otherwise({
        redirectTo: '/'
      });
		Stripe.setPublishableKey(STRIPE.PUBLISHABLE_KEY);
  });
