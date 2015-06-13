'use strict';

angular.module('roseStClient').controller('DonateController', function ($scope, $modal, StripeFactory, $log, $timeout, StripeCheckout) {

	$scope.custom = true;
	$scope.toggleCustom = function () {
		$scope.custom = $scope.custom === false ? true : false;
	};

	$scope.checkButton = false;
	$scope.toggleCheckButton = function () {
		$scope.checkButton = $scope.checkButton === false ? true : false;
	};

	$scope.xButton = false;
	$scope.toggleXButton = function () {
		$scope.xButton = $scope.xButton === false ? true : false;
	};

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



	var handler = StripeCheckout.configure({
		name: "Custom Example",
		token: function (token, args) {
			$log.debug("Got stripe token: " + token.id);
		}
	});

	var buttons = [1, 2, 3, 4, 5, 6]

	var options = {
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
		handler.open(options).then(function (result) {
			console.log("Got Stripe token: " + result[0].id);
			console.log("Amount:", options)
			StripeFactory.sendToken(result[0].id, options)
		}, function () {
			console.log("Stripe Checkout closed without making a sale :(");
		});
	};

	this.doCheckoutById = function (id) {
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i] === id) {
				options["amount"] = buttons[i] * 1000;
				options["description"] = "Donate $" + buttons[i] * 10 + " to Rose St.";
				doCheckout();
			}
		}
	};

	var doCheckout = function (token, args) {
		// The default handler API is enhanced by having open()
		// return a promise. This promise can be used in lieu of or
		// in addition to the token callback (or you can just ignore
		// it if you like the default API).
		//
		// The rejection callback doesn't work in IE6-7.
		handler.open(options).then(function (result) {
			console.log("Got Stripe token: " + result[0].id);
			console.log("Amount:", options)
			StripeFactory.sendToken(result[0].id, options)
		}, function () {
			console.log("Stripe Checkout closed without making a sale :(");
		});
	};

	this.setPayment = function (amount) {
		console.log(amount)
		$scope.amount = amount;
		options["amount"] = parseFloat(amount.replace(/,/g, '')) * 100;
		options["description"] = "Donate $" + amount;
	};

	this.doCustomCheckout = function () {
		doCheckout();
	};

	//	parseFloat('100,000.00'.replace(/,/g, ''))

	//	data-key="pk_test_f6MApsp3oUQNaZSejidOONkT" data-name="Rose St. Community Center" data-description="donate to Rose St." data-amount="1000" data-image="images/10322663_618915454865065_6177637275289747984_n.jpg" 

	$scope.confirm = function (amount) {
		$scope.amount = amount;
		$scope.$modalInstance = $modal.open({
			scope: $scope,
			templateUrl: 'views/partials/payment-form.html',
			size: 'lg',
			controller: 'DonateController',
			controllerAs: 'donateController'
		});
	};
});