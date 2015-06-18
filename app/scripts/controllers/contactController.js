'use strict';

angular.module('roseStClient').controller('ContactController', function ($http, $scope, ServerUrl) {

//	$scope.contact = {};
	//    $scope.submitForm = function(data) {
	//        console.log("posting data....");
	//        $http.post('././mail/contact_me.php', JSON.stringify(data)).success(function(response){
	//			  console.log(response)
	//		  }).error(function(response) {
	//			  console.log(response);
	//		  })
	//	 }

//	$scope.submitForm = function (data) {
//		$http({
//			method: 'POST',
//			url: '././mail/contact_me.php',
//			data: $.param(data), // pass in data as strings
//			headers: {
//				'Content-Type': 'application/x-www-form-urlencoded'
//			} // set the headers so angular passing info as form data (not request payload)
//		})
//	}
	
	 $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
	
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : '././mail/contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed :( Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
});