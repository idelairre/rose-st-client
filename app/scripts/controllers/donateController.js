'use strict';

angular.module('roseStClient').controller('DonateController', function ($scope, $modal, $filter, $window, StripeFactory, $log, $timeout, StripeCheckout) {

	//	$scope.watchButton = function () {
	//		console.log("called")
	//		$scope.$watch(
	//			function () {
	//				return $scope.checkButton;
	//			},
	//			function (newValue, oldValue) {
	//				if (newValue !== oldValue) {
	//					$timeout(function () {
	//						$scope.checkButton = false;
	//					}, 5000)
	//				}
	//			}
	//		);
	//	};

	// consider experimenting with intervals to make the appearance of the "x" and "check" button more smooth
	// note: this is really hard to do well

	// stripe handler for charges

	var handler = StripeCheckout.configure({
		name: "Rose St.",
		token: function (token, args) {
			$log.debug("Got stripe token: " + token.id);
		}
	});
	
	var chargeOptions = {
		name: "Rose St. Community Center",
		image: "images/10322663_618915454865065_6177637275289747984_n.jpg",
		panelLabel: "Donate"
	};

	var doCheckout = function (token, args) {
		// The default handler API is enhanced by having open()
		// return a promise. This promise can be used in lieu of or
		// in addition to the token callback (or you can just ignore
		// it if you like the default API).
		//
		// The rejection callback doesn't work in IE6-7.
		handler.open(chargeOptions).then(function (result) {
			console.log("Got Stripe token: " + result[0].id);
			console.log("Amount:", chargeOptions)
			StripeFactory.sendChargeToken(result[0].id, chargeOptions);
			// this response has a number of entries that might be useful for making
			// the stripe data more descriptive
		}, function () {
			console.log("Stripe Checkout closed without making a sale");
		});
	};

	this.doCheckoutById = function (id) {
		chargeOptions["amount"] = id * 1000;
		chargeOptions["description"] = "Donate $" + id * 10 + " to Rose St.";
		doCheckout();
	};

	this.setPayment = function (amount) {
		chargeOptions["description"] = "Donate " + $filter('currency')(amount) + " to Rose St.";

		if (typeof amount === 'string') {
			amount = parseFloat(amount.replace(/,/g, ''));
		} else {
			amount = parseFloat(amount);
		}

		chargeOptions["amount"] = amount * 100;
	};

	this.doCustomCheckout = function () {
		doCheckout();
	};

	// subscriptions

	var subscriptionOptions = {
		name: "Rose St. Community Center",
		image: "images/10322663_618915454865065_6177637275289747984_n.jpg",
		panelLabel: "Donate fdsa"
	};

	var doSubscriptionCheckout = function (subscriptionId) {
		handler.open(subscriptionOptions).then(function (result) {
			console.log("Got Stripe token: " + result[0].id);
			console.log("Amount:", chargeOptions)
			StripeFactory.sendSubscriptionToken(result[0].id, subscriptionId)
		}, function () {
			console.log("Stripe Checkout closed without making a sale");
		});
	};

	this.setSubscriptionPayment = function (amount) {
		subscriptionOptions["description"] = "Donate " + $filter('currency')(amount) + " monthly to Rose St.";

		if (typeof amount === 'string') {
			amount = parseFloat(amount.replace(/,/g, ''));
		} else {
			amount = parseFloat(amount);
		}

		subscriptionOptions["amount"] = amount * 100;
		console.log(subscriptionOptions)
	};

	this.doSubscriptionCheckoutById = function (id) {
		console.log("called")
		subscriptionOptions["amount"] = id * 1000;
		subscriptionOptions["description"] = "Donate $" + id * 10 + " monthly to Rose St.";
		doSubscriptionCheckout(id);
		console.log(subscriptionOptions)
	};

	this.doCustomSubscriptionCheckout = function () {
		handler.open(subscriptionOptions).then(function (result) {
			console.log("Got Stripe token: " + result[0].id);
			console.log("Amount:", subscriptionOptions)
			StripeFactory.sendCustomSubscriptionToken(result[0].id, subscriptionOptions.amount);
		}, function () {
			console.log("Stripe Checkout closed without making a sale");
		});
	};
});