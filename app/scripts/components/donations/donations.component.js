import { Component, Inject, Resolve } from 'ng-forward';
import DonationButton from './donations.directives/donation-button.component';
import DonationsService from './donations.service';
// import StripeCheckout from 'angular-stripe-checkout';
import 'angular-ui-bootstrap';
import 'babel-polyfill';

const ESC_KEY = 27;
const ENTER_KEY = 13;

@Component({
	selector: 'donations',
	controllerAs: 'donationsCtrl',
	providers: ['stripe.checkout', DonationsService],
	directives: [DonationButton],
	template: require('./donations.html')
})

@Inject('$filter', '$scope', 'StripeCheckout', DonationsService)
export default class DonationsComponent {
	@Resolve()
	@Inject(DonationsService)
	static resolve(DonationsService) {
	  return DonationsService.importScript() && DonationsService.loadLibrary();
	}

	constructor($filter, $scope, StripeCheckout, DonationsService) {
		this.$filter = $filter;
		this.$scope = $scope;
		this.DonationsService = DonationsService;
		this.amount = null;
		this.subscriptionAmount = null;

		this.DonationsService = DonationsService;

		this.handler = StripeCheckout.configure({
			name: 'Rose St.',
			token: (token, args) => {
				console.log(`Got stripe token: ${token.id}`);
			}
		});

		this.chargeOptions = {
			name: 'Rose St. Community Center',
			image: 'images/10322663_618915454865065_6177637275289747984_n.jpg',
			panelLabel: 'Donate'
		};
	}

	async doCheckout(token, args) {
		console.log(arguments);
	  // The default handler API is enhanced by having open()
	  // return a promise. This promise can be used in lieu of or
	  // in addition to the token callback (or you can just ignore
	  // it if you like the default API).
	  //
	  // NB: The rejection callback doesn't work in IE6-7.
		try {
			let result = await this.handler.open(this.chargeOptions);
			console.log(`Got Stripe token: ${result[0].id}`);
			console.log(`Amount: ${this.chargeOptions}`);
			this.DonationsService.sendChargeToken(result[0].id, chargeOptions);
		} catch (error) {
			console.error(error);
		}
	}

	checkoutById (id) {
		this.chargeOptions['amount'] = (id * 1000);
		this.chargeOptions['description'] = `Donate $${(id * 10)} to Rose St.`;
		this.doCheckout();
	}

	setPayment(event, amount) {
		if (event.keyCode === ENTER_KEY) {
			this.chargeOptions['description'] = `Donate ${amount} to Rose St.`;
			amount = parseFloat(amount.replace(/\D/g, ''));
			this.chargeOptions['amount'] = (amount * 100);
			console.log(this.chargeOptions);
		}
	}

	//
	// async doSubscriptionCheckout(subscriptionId) {
	// 	try {
	// 		let result = await this.handler.open(this.subscriptionOptions);
	// 		console.log(`Got Stripe token: ${result[0].id}`)
	// 		console.log(`Amount: ${this.chargeOptions}`)
	// 		this.DonationsService.sendSubscriptionToken(result[0].id, subscriptionId);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	//
	// setSubscriptionPayment(amount) {
	// 	this.subscriptionOptions['description'] = `Donate ${$filter('currency')(amount)} monthly to Rose St.`;
	// 	if (typeof amount === 'string') {
	// 		amount = parseFloat(amount.replace(/,/g, ''));
	// 	} else {
	// 		amount = parseFloat(amount);
	// 	}
	// 	this.subscriptionOptions['amount'] = amount * 100;
	// 	console.log(subscriptionOptions)
	// }
	//
	// doSubscriptionCheckoutById(id) {
	// 	this.subscriptionOptions['amount'] = id * 1000;
	// 	this.subscriptionOptions['description'] = `Donate $${(id * 10)} monthly to Rose St.`;
	// 	this.doSubscriptionCheckout(id);
	// 	console.log(this.subscriptionOptions)
	// };
	//
	// async doCustomSubscriptionCheckout() {
	// 	let result = await this.handler.open(subscriptionOptions);
	// 	console.log(`Got Stripe token: ${result[0].id}`);
	// 	console.log(`Amount: ${subscriptionOptions}`)
	// 	this.DonationsService.sendCustomSubscriptionToken(result[0].id, this.subscriptionOptions.amount);
	// }
}
