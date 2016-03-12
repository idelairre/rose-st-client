import { Inject } from 'ng-forward';
import { STRIPE } from '../constants/constants';
import 'angulartics';
import 'angulartics-google-analytics';
import 'angular-stripe-checkout';
import 'reflect-metadata';

class AnalyticsConfig {
  @Inject('$analyticsProvider')
  run($analyticsProvider) {
    $analyticsProvider.firstPageview(true);
    $analyticsProvider.withBase(true);
  }
}

export default angular.module('roseStClient.analytics', ['angulartics', 'angulartics.google.analytics']).config(AnalyticsConfig.run);
