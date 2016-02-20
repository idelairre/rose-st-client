import { Component, Inject, Resolve } from 'ng-forward';
import DonationButton from './donations.directives/donation-button.component';
import DonationsService from './donations.service';
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
	@Inject('StripeCheckout')
	static resolve(StripeCheckoutProvider) {
		return StripeCheckoutProvider.load;
	}

	constructor($filter, $scope, StripeCheckout, DonationsService) {
		this.$filter = $filter;
		this.$scope = $scope;
		this.DonationsService = DonationsService;
		this.amount = null;
		this.subscriptionAmount = null;
		this.lastClicked = null;

		this.DonationsService = DonationsService;
		this.handler = {};
		this.StripeCheckout = {};
		this.chargeOptions = {};
		this.donationButtons = [];
	}

	ngOnInit() {
	  this.initializeStripe();
	}

	ngAfterViewInit() {
		let donationButtons = Array.prototype.slice.call(document.getElementsByTagName('donation-button'));
		this.donationButtons.length = donationButtons.length;
	}

	initializeStripe() {
		console.log('initializing stripe...');
		try {
			this.StripeCheckout = StripeCheckout;

			this.handler = this.StripeCheckout.configure({
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

		} catch (error) {
			console.info(error);
			this.DonationsService.loadCheckout().then(() => this.initializeStripe());
		}
	}

	async doCheckout(type) {
		console.log('do checkout', arguments);
	  // The default handler API is enhanced by having open()
	  // return a promise. This promise can be used in lieu of or
	  // in addition to the token callback (or you can just ignore
	  // it if you like the default API).
	  //
	  // NB: The rejection callback doesn't work in IE6-7.
		try {
			let result = await this.handler.open(this.chargeOptions);
			console.log(`Got Stripe token: ${result[0].id}`);
			console.log(`Amount: ${this.chargeOptions.amount}`);
			if (type === 'charge') {
				this.DonationsService.sendChargeToken(result[0].id, this.chargeOptions);
			} else if (type === 'subscription') {
				this.DonationsService.sendSubscriptionToken(result[0].id, this.chargeOptions);
			}
		} catch (error) {
			console.error(error);
		}
	}

	setPayment(event, amount, type) {
		if (typeof amount === 'string') {
			amount = parseFloat(amount.replace(/\D/g, ''));
		}
		this.chargeOptions['amount'] = (amount * 100);
		if (event.keyCode === ENTER_KEY || event.type === 'click') {
			if (type === 'charge') {
				this.chargeOptions['description'] = `Donate $${amount} to Rose St.`;
			} else if (type === 'subscription') {
				this.chargeOptions['description'] = `Donate $${amount} monthly to Rose St.`;
			}
		}
	}

	setClicked(event, id) {
		for (let i in this.donationButtons) {
			this.donationButtons[i] = false;
		}
		this.donationButtons[id] = true;
	}

	resetClicked(id) {
		for (let i = 0; this.donationButtons.length > i; i += 1) {
			if (i !== id) {
				this.donationButtons[i] = true;
			}
		}
	}
}
