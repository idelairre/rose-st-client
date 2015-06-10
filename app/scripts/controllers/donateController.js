'use strict';

angular.module('roseStClient').controller('DonateController', function ($scope, $modal) {
		
		$scope.confirm = function (paymentInfo) {
			$scope.paymentInfo = paymentInfo;	
			$scope.$modalInstance = $modal.open({
				scope: $scope,
				templateUrl: 'views/partials/confirm-payment.html',
				size: 'lg',
				controller: 'DonateController',
				controllerAs: 'donateController'
		});
	};
});
