import { Inject } from 'ng-forward';
import 'angulartics';
import 'angulartics-google-analytics';
import 'reflect-metadata';

class AnalyticsConfig {
  @Inject('$analyticsProvider')
  run($analyticsProvider) {
    $analyticsProvider.firstPageview(true);
    $analyticsProvider.withBase(true);
  }
}

export default angular.module('roseStClient.analytics', ['angulartics', 'angulartics.google.analytics']).config(AnalyticsConfig.run);
