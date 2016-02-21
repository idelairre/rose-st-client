import { Component, Inject, Resolve } from 'ng-forward';
import DonationButton from './donations.directives/donation-button.component';
import DonationsService from './donations.service';
import { STRIPE } from '../../constants/constants';
import 'angular-ui-bootstrap';
import 'angular-ui-notification';
import 'babel-polyfill';

const ESC_KEY = 27;
const ENTER_KEY = 13;
const PAYMENT_ERROR = 'There was an error processing your payment. It was likely a problem on our end. It has been logged and will be processed as soon as the problem is fixed. We will send you an email notification when your payment goes through';
const STRIPE_THUMBNAIL_URL = 'https://raw.githubusercontent.com/idelairre/rose_st_client/master/app/images/10322663_618915454865065_6177637275289747984_n.jpg';

@Component({
	selector: 'donations',
	controllerAs: 'donationsCtrl',
	providers: ['stripe.checkout', 'ui-notification', DonationsService],
	directives: [DonationButton],
	template: require('./donations.html')
})

@Inject('$filter', '$scope', 'StripeCheckout', 'Notification', DonationsService)
export default class DonationsComponent {
	@Resolve()
	@Inject('StripeCheckout')
	static resolve(StripeCheckoutProvider) {
		return StripeCheckoutProvider.load;
	}

	constructor($filter, $scope, StripeCheckout, Notification, DonationsService) {
		this.$filter = $filter;
		this.$scope = $scope;
		this.DonationsService = DonationsService;
		this.amount = null;
		this.subscriptionAmount = null;

		this.DonationsService = DonationsService;

		this.Notification = Notification;

		this.handler = {};
		this.StripeCheckout = {};
		this.chargeOptions = {
			name: 'Rose St. Community Center',
			image: STRIPE_THUMBNAIL_URL,
			panelLabel: 'Donate',
			amount: null,
			description: null
		};
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
			angular.extend(this.StripeCheckout, StripeCheckout);
		} catch (error) {
			console.info(error);
			this.DonationsService.loadCheckout().then(() => this.initializeStripe());
		}
	}

	// The default handler API is enhanced by having open()
	// return a promise. This promise can be used in lieu of or
	// in addition to the token callback (or you can just ignore
	// it if you like the default API).

	// NB: The rejection callback doesn't work in IE6-7.
	doCheckout(type) {
		console.log(`charge slug: [type: ${type}, amount: ${this.chargeOptions.amount}]`);
		if (typeof this.chargeOptions.amount !== 'number') {
			return;
		}
		try {
			this.handler = this.StripeCheckout.configure({
				name: 'Rose St.',
				key: STRIPE.PUBLISHABLE_KEY,
				token: (token, args) => {
					this.handleCharge(token, type);
				}
			});
			this.handler.open(this.chargeOptions);
		} catch (error) {
			console.error(error);
		}
	}

	async handleCharge(token, type) {
		try {
			console.log(`charge type: ${type}`);
			console.log(`Got stripe token: ${token.id}`);
			console.log(`Amount: ${this.chargeOptions.amount}`);
			if (type === 'charge') {
				let result = await this.DonationsService.sendChargeToken(token.id, this.chargeOptions);
				console.log(result);
			} else if (type === 'subscription') {
				let result = await this.DonationsService.sendSubscriptionToken(token.id, this.chargeOptions);
				console.log(result);
			} else if (type === 'subscription-custom') {
				let result = await this.DonationsService.sendCustomSubscriptionToken(token.id, this.chargeOptions);
				console.log(result);
			}
		} catch (error) {
			console.error(error);
			this.Notification.error({
				message: PAYMENT_ERROR
			});
		}
	}

	setPayment(event, opts) {
		if (typeof opts.amount === 'string') {
			opts.amount = parseFloat(opts.amount.replace(/\D/g, ''));
		}
		if (event.keyCode === ENTER_KEY || event.type === 'click') {
			this.chargeOptions.amount = opts.amount * 100;
			console.log('payment set: ', this.chargeOptions.amount);
			if (opts.type === 'charge') {
				this.chargeOptions.description = `Donate $${opts.amount} to Rose St.`;
			} else if (opts.type === 'subscription') {
				this.chargeOptions.id = opts.id;
				this.chargeOptions.description = `Donate $${opts.amount} monthly to Rose St.`;
			} else if (opts.type === 'subscription-custom') {
				this.chargeOptions.description = `Donate $${opts.amount} monthly to Rose St.`;
			} else {
				throw new Error('no charge type set');
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
