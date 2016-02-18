import axios from 'axios';
import { Injectable, Inject } from 'ng-forward';
import { SERVER_URL } from '../constants/constants';
import 'babel-polyfill';

@Injectable()
@Inject('$window')
export default class AuthService {
	constructor($window) {
		this.$window = $window;
		this.session = {};
	}

	async login(credentials) {
		try {
			let response = await axios.post(`${SERVER_URL}/users/login`, credentials);
			angular.copy(response.data, this.session);
			this._storeSession(response);
		} catch (error) {
			console.error(error);
		}
	}

	async logout() {
		try {
			let response = await axios.post(`${SERVER_URL}/users/logout`);
			this.$window.localStorage.removeItem('rs-user');
			console.log('logged out');
		} catch (error) {
			console.error(error);
		}
	}

	async register(credentials) {
		let params = {
			user: {
				email: credentials.email,
				password: credentials.password
			}
		};
		try {
			let response = await axios.post(`${SERVER_URL}/posts/users/`, params);
			this._storeSession(response.data);
			console.log('registered: ', response.data);
		} catch (error) {
			console.error(error);
		}
	}

	isAuthenticated() {
  	if (JSON.parse(this.$window.localStorage.getItem('rs-user'))) {
      return true;
    } else {
      return false;
    }
  }

	_storeSession(data) {
		this.$window.localStorage.setItem('rs-user', JSON.stringify(data));
		// best practice is to give unique prefixes to your letiables
		// axios.defaults.headers.common.Authorization = 'Token token=' + data.token;
	}
}
