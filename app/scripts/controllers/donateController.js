'use strict';

angular.module('roseStClient').controller('DonateController', function ($scope, $modal) {
	
  $scope.ok = function () {
    $scope.$modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $scope.$modalInstance.dismiss('cancel');
  };

	$scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'views/partials/custom-donation.html',
      controller: 'DonateController',
      size: 'lg'
    	});
	}
});
