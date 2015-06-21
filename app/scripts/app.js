'use strict';

angular.module('roseStClient', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'payment', 'ui.bootstrap', 'textAngular', 'stripe.checkout', 'angularUtils.directives.dirDisqus', 'ui.keypress'])
	.config(function ($routeProvider, $locationProvider, STRIPE, StripeCheckoutProvider) {
		StripeCheckoutProvider.defaults({
			key: STRIPE.PUBLISHABLE_KEY
		});
		$locationProvider.hashPrefix('!');
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				activetab: 'home'
			})
			.when('/posts/:id', {
				templateUrl: 'views/post.html',
				controller: 'MainController',
				activetab: 'home'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutController',
				activetab: 'about'
			})
			.when('/donate', {
				templateUrl: 'views/donate.html',
				controller: 'DonateController',
				controllerAs: 'donateController',
				activetab: 'donate',
				resolve: {
					// checkout.js isn't fetched until this is resolved.
					stripe: StripeCheckoutProvider.load
				}
			})
			.when('/contact', {
				templateUrl: 'views/contact.html',
				controller: 'ContactController',
				activetab: 'contact'
			})
			.when('/login', {
				templateUrl: 'views/main.html',
				controller: 'AuthController'
			})
			.otherwise({
				redirectTo: '/'
			});
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
	});