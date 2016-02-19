import { Inject } from 'ng-forward';
import 'angular-stripe-checkout';

@Inject('StripeCheckout')
class StripeLogger {
  constructor() {
    console.log(arguments);
    // // You can set defaults here, too.
    // StripeCheckoutProvider.defaults({
    //   opened: () => {
    //     console.log('Stripe Checkout opened');
    //   },
    //   closed: () => {
    //     console.log('Stripe Checkout closed');
    //   }
    // });
  }

  static init() {
    StripeLogger.instance = new StripeLogger();
    return StripeLogger.instance;
  }
}

export default angular.module('roseStClient.logger', ['stripe.checkout']).run(StripeLogger.init);
