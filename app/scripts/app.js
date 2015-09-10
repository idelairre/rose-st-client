'use strict';

angular.module('roseStClient', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'payment', 'ui.bootstrap', 'textAngular', 'stripe.checkout', 'angularUtils.directives.dirDisqus', 'angularUtils.directives.dirPagination', 'ui.keypress', '720kb.socialshare'])
	.config(function ($routeProvider, $locationProvider, STRIPE, StripeCheckoutProvider) {
		StripeCheckoutProvider.defaults({
			key: STRIPE.PUBLISHABLE_KEY
		});
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				activetab: 'home'
			})
			.when('/post/:post', {
				templateUrl: 'views/post.html',
				controller: 'MainController',
				activetab: 'home'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
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
				templateUrl: 'views/login.html',
				activetab: 'login'
			})
			.otherwise({
				redirectTo: '/'
			});
			$locationProvider.html5Mode(true);
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