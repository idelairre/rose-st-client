'use strict';

angular.module('roseStClient').controller('ContactController', function ($http, $scope, ServerUrl) {

	$scope.contact = {};

	//    $scope.submitForm = function(data) {
	//        console.log("posting data....");
	//        $http.post('././mail/contact_me.php', JSON.stringify(data)).success(function(response){
	//			  console.log(response)
	//		  }).error(function(response) {
	//			  console.log(response);
	//		  })
	//	 }

	$scope.submitForm = function (data) {
		$http({
			method: 'POST',
			url: '././mail/contact_me.php',
			data: $.param(data), // pass in data as strings
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			} // set the headers so angular passing info as form data (not request payload)
		})
	}
});