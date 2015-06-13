'use strict';

angular.module('roseStClient', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'payment', 'ui.bootstrap', 'textAngular', 'stripe.checkout'])
	.config(function ($routeProvider, STRIPE, StripeCheckoutProvider) {
		StripeCheckoutProvider.defaults({
			key: STRIPE.PUBLISHABLE_KEY
		});
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
				controllerAs: 'donateController',
				resolve: {
					// checkout.js isn't fetched until this is resolved.
					stripe: StripeCheckoutProvider.load
				}
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
			})
	})
	.run(function ($log, StripeCheckout) {
		// You can set defaults here, too.
		StripeCheckout.defaults({
			opened: function () {
				$log.debug("Stripe Checkout opened");
			},

			closed: function () {
				$log.debug("Stripe Checkout closed");
			}
		});
	})
	//Stripe.setPublishableKey(STRIPE.PUBLISHABLE_KEY);
	//});