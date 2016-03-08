import { Inject } from 'ng-forward';
import { STRIPE } from '../constants/constants';
import 'angular-stripe-checkout';
import 'reflect-metadata';

@Inject('$stateProvider', '$urlRouterProvider', '$locationProvider', 'StripeCheckout')
class RouteConfig {
  constructor($stateProvider, $urlRouterProvider, $locationProvider, StripeCheckoutProvider) {
    $locationProvider.html5Mode({
      enabled: true
    })
    StripeCheckoutProvider.defaults({
      key: STRIPE.PUBLISHABLE_KEY
    });
    $urlRouterProvider.otherwise('/');
  }

  static init($stateProvider, $urlRouterProvider, $locationProvider, StripeCheckoutProvider) {
    RouteConfig.instance = new RouteConfig($stateProvider, $urlRouterProvider, $locationProvider, StripeCheckoutProvider);
    return RouteConfig.instance;
  }
}

export default angular.module('roseStClient.config', ['stripe.checkout']).config(RouteConfig.init);
