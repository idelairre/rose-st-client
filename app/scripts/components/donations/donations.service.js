import axios from 'axios';
import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import 'babel-polyfill';

const STRIPE_CHECKOUT_URL = 'https://checkout.stripe.com/checkout.js';

@Injectable()
@Inject('$document')
export default class DonationsService {
	constructor($document) {
		this.$document = $document;
		this.stripeContainer = {};
	}

	importScript() {
		try {
			let doc = this.$document[0];
			let script = doc.createElement('script');
			script.src = STRIPE_CHECKOUT_URL;
			script.type = 'text\/javacsript';
			script.onerror = this.handleLoadError;
			let container = doc.getElementsByTagName('head')[0];
			this.stripeContainer = container.appendChild(script);
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	handleLoadError(error) {
		return new URIError('Unable to load checkout.js', error);
	}

	loadLibrary() {
		console.log(angular.element(this.stripeContainer).scope());
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
