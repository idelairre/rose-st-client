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
		try {
			console.log('running stripe load script...');
			return this.StripeCheckout.load();
		} catch (error) {
			this.handleLoadError(error);
		}
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
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async sendSubscriptionToken(token, options) {
		let params = {
			token: token,
			subscription_id: options.id
		};
		try {
			let response = await axios.post(`${SERVER_URL}/charges/subscription`, params);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async sendCustomSubscriptionToken(token, options) {
		let params = {
			token: token,
			amount: options.amount
		};
		try {
			let response = await axios.post(`${SERVER_URL}/charges/custom_subscription`, params);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
