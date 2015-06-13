'use strict';

angular.module('roseStClient').factory('StripeFactory', ['$http', function ($http) {

	var sendToken = function (token, options) {
		var params = {
			token: token,
			amount: options.amount
		}
			console.log(token)
		return $http.post('http://localhost:3000/charges/', params).then(function (response) {
			console.log(response)
		});
	};

	return {
		sendToken: sendToken
	};
}]);