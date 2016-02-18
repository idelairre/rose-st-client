import { Inject } from 'ng-forward';

@Inject('stripe.checkout')
class StripeLogger {
  constructor(StripeCheckoutProvider) {
    // You can set defaults here, too.
    StripeCheckoutProvider.defaults({
      opened: () => {
        console.log('Stripe Checkout opened');
      },

      closed: () => {
        console.log('Stripe Checkout closed');
      }
    });
  }

  static init(StripeCheckoutProvider) {
    StripeLogger.instance = new RouteConfig(StripeCheckoutProvider);
    return StripeLogger.instance;
  }
}

export default angular.module('roseStClient.config', []).run(StripeLogger.init);
