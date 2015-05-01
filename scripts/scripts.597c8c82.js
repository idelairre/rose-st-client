"use strict";angular.module("roseStClient",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angularPayments","ui.bootstrap"]).config(["$routeProvider","STRIPE",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainController"}).when("/about",{templateUrl:"views/about.html",controller:"AboutController"}).when("/donate",{templateUrl:"views/donate.html",controller:"DonateController"}).otherwise({redirectTo:"/"}),Stripe.setPublishableKey(b.PUBLISHABLE_KEY)}]),angular.module("roseStClient").constant("STRIPE",{PUBLISHABLE_KEY:"pk_test_f6MApsp3oUQNaZSejidOONkT",SECRET_KEY:"sk_test_TcKD9GvI1QOcc4Y2sYWqcIBC"}),angular.module("roseStClient").constant("ServerUrl","http://rose-st-api.herokuapp.com"),angular.module("roseStClient").controller("MainController",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("roseStClient").controller("AboutController",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("roseStClient").controller("DonateController",["$scope","$modal",function(a,b){a.ok=function(){a.$modalInstance.close(a.selected.item)},a.cancel=function(){a.$modalInstance.dismiss("cancel")},a.open=function(){b.open({templateUrl:"views/partials/custom-donation.html",controller:"DonateController",size:"lg"})}}]),angular.module("MainDirective",[]),angular.module("MainDirective").directive("donateForm",[function(a){return{restrict:"E",templateUrl:"views/donate-form.html",controller:"DonateController",controllerAs:"donateController",bindToController:!0,scope:{},link:function(a,b,c){}}}]);