'use strict';

angular.module('roseStClient').controller('ContactController', function ($http, $scope, ServerUrl) {
	
	var contact = {};
    
    $scope.submitForm = function(data) {
        console.log("posting data....");
        $http.post('localhost:9000/mail/contact_me.php', JSON.stringify(data)).success(function(){/*success callback*/});
    };
});