import axios from 'axios';
import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import 'babel-polyfill';

const STRIPE_CHECKOUT_URL = 'https://checkout.stripe.com/checkout.js';

@Injectable()
@Inject('StripeCheckout')
export default class DonationsService {
	constructor(StripeCheckout) {
		this.StripeCheckout = StripeCheckout;
	}

	loadCheckout() {
		console.log('running stripe load script...');
		return this.StripeCheckout.load();
	}

	handleLoadError(error) {
		return new URIError('Unable to load checkout.js', error);
	}

	async sendChargeToken(token, options) {
		let params = {
			token: token,
			amount: options.amount,
		};
		try {
			let response = await axios.post(`${SERVER_URL}/charges/`, params);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	async sendSubscriptionToken(token, subscriptionId) {
		let params = {
			token: token,
			subscription_id: subscriptionId
		};
		try {
			let response = await axios.post(`${SERVER_URL}/charges/subscription`, params);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}

	async sendCustomSubscriptionToken(token, amount) {
		let params = {
			token: token,
			amount: amount
		};
		try {
			let response = await axios.post(`${SERVER_URL}/charges/custom_subscription`, params);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
}
