'use strict';

angular.module('roseStClient').factory('StripeFactory', ['$http', function ($http) {

	var sendChargeToken = function (token, options) {
		var params = {
			token: token,
			amount: options.amount
		}
		return $http.post('http://localhost:3000/charges/', params).then(function (response) {
			console.log(response)
		});
	};
	
	var sendSubscriptionToken = function (token, subscriptionId) {
		var params = {
			token: token,
			subscription_id: subscriptionId
		}
		return $http.post('http://localhost:3000/charges/subscription', params).then(function (response) {
			console.log(response)
		});
	};
	
	var sendCustomSubscriptionToken = function (token, amount) {
		var params = {
			token: token,
			amount: amount
		}
		return $http.post('http://localhost:3000/charges/custom_subscription', params).then(function (response) {
			console.log(response)
		});
	};


	return {
		sendChargeToken: sendChargeToken,
		sendSubscriptionToken: sendSubscriptionToken,
		sendCustomSubscriptionToken: sendCustomSubscriptionToken
	};
}]);