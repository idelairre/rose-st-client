'use strict';

angular.module('roseStClient')
	.directive('rstForm', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/donate-form.html',
			replace: true
		};
	})
	.directive('restrictNumeric', function () {
		var restrictNumeric = function (e) {
			if (e.metaKey || e.ctrlKey || e.which === 0 || e.which < 33) {
				return;
			}
			if (e.which === 32 || !!/[\d\s]/.test(String.fromCharCode(e.which)) === false) {
				e.preventDefault();
			} // jshint ignore:line
		};

		return {
			restrict: 'A',
			link: function postLink(scope, element) {
				element.bind('keypress', restrictNumeric);
			}
		};
	})
	.directive('currencyInput', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {

				return ctrl.$parsers.push(function (inputValue) {
					var inputVal = element.val();

					//clearing left side zeros
					while (inputVal.charAt(0) == '0') {
						inputVal = inputVal.substr(1);
					}

					inputVal = inputVal.replace(/[^\d.\',']/g, '');

					var point = inputVal.indexOf(".");
					if (point >= 0) {
						inputVal = inputVal.slice(0, point + 3);
					}

					var decimalSplit = inputVal.split(".");
					var intPart = decimalSplit[0];
					var decPart = decimalSplit[1];

					intPart = intPart.replace(/[^\d]/g, '');
					if (intPart.length > 3) {
						var intDiv = Math.floor(intPart.length / 3);
						while (intDiv > 0) {
							var lastComma = intPart.indexOf(",");
							if (lastComma < 0) {
								lastComma = intPart.length;
							}

							if (lastComma - 3 > 0) {
								intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
							}
							intDiv--;
						}
					}

					if (decPart === undefined) {
						decPart = "";
					} else {
						decPart = "." + decPart;
					}

					var res = intPart + decPart;

					if (res != inputValue) {
						ctrl.$setViewValue(res);

					} else {
						ctrl.$setViewValue(inputValue);
					}
					
					ctrl.$render();
					scope.paymentAmount = inputValue.replace(/,/g, '');

				});

			}
		}
	});