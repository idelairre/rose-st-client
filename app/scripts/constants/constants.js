'use strict';

angular.module('roseStClient')
		 .constant("STRIPE", {
					 'PUBLISHABLE_KEY': 'pk_test_f6MApsp3oUQNaZSejidOONkT',
					 'SECRET_KEY': 'sk_test_TcKD9GvI1QOcc4Y2sYWqcIBC'
					 });
angular.module('roseStClient').constant('ServerUrl', 'https://rose-st-api.herokuapp.com');