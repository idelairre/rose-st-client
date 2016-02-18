import { Component, Inject } from 'ng-forward';

@Component({
	selector: 'main',
	controllerAs: 'mainCtrl',
	providers: [AuthFactory, PostsFactory]
})

@Inject('$scope', '$routeParams', '$rootScope', AuthFactory, PostsFactory)
export default class MainComponent {
	constructor($scope, $rootScope, AuthFactory, PostFactory) {
		// custom donation button stuff
		$scope.keypressCallback = ($event) => {
			if ($event.which === 27) {
				if ($rootScope.custom[1] === false) {
					$rootScope.custom[1] = true;
					console.log("custom state:", $scope.custom[1])
				} else if ($rootScope.custom[2] === false) {
					$rootScope.custom[2] = true;
				}
				$event.preventDefault();
			}
		};

		// these need way better fucking names
		$rootScope.custom = {};
		$rootScope.custom[1] = true;
		$rootScope.custom[2] = true;
		$rootScope.toggleCustom = (id) => {
			$rootScope.custom[id] = $rootScope.custom[id] === false ? true : false;
			console.log("custom state:", $rootScope.custom[id])
		};

		$scope.title = "Rose St. Community Center";
		$scope.subheading = "100 Blocks Homocide-Free Zone";

		// pagination

		$scope.pageChangeHandler = function (num) {
			console.log('going to page ' + num);
		};

		$scope.currentPage = 1;
	}
}
