import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';

@Injectable()
@Inject('$http', 'StripeCheckout')
export default class DonationsService {
	constructor($http, StripeCheckout) {
		this.$http = $http;
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
			let response = await this.$http.post(`${SERVER_URL}/donations/`, params);
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
			let response = await this.$http.post(`${SERVER_URL}/donations/subscription`, params);
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
			let response = await this.$http.post(`${SERVER_URL}/donations/custom_subscription`, params);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
