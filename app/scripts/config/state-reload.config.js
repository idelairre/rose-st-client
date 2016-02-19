import { Inject } from 'ng-forward';

@Inject('$delegate', '$provide')
class StateReload {
  constructor($delegate, $provide) {
    $provide.decorator('$state', ($delegate) => {
      let originalTransitionTo = $delegate.transitionTo;
      $delegate.transitionTo = (to, toParams, options) => {
        return originalTransitionTo(to, toParams, angular.extend({
          reload: true
        }, options));
      };
      return $delegate;
    });
  }

  static init($delegate, $provide) {
    StateReload.instance = new StateReload($delegate, $provide);
    return StateReload.instance;
  }
}

export default angular.module('roseStClient.refresh', []).config(StateReload.init);
