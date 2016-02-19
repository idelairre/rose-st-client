import axios from 'axios';
import { Component, Inject } from 'ng-forward';
import SERVER_URL from '../../constants/constants';
import 'babel-polyfill';

@Component({
	selector: 'contact',
	template: require('./contact.html'),
	controllerAs: 'contactCtrl'
})

export default class ContactCtrl {
	constructor() {
		this.result = 'hidden'
		this.resultMessage = '';
		this.formData = {};
		this.submitButtonDisabled = false;
		this.submitted = false;
	}

	submit(contactform) {
	  this.submitted = true;
	  this.submitButtonDisabled = true;
	  if (contactform.$valid) {
			this.postForm(contactForm);
	  } else {
	    this.submitButtonDisabled = false;
	    this.resultMessage = 'Failed :( Please fill out all the fields.';
	    this.result = 'bg-danger';
	  }
	}

	async postForm(formData) {
		try {
			let response = await axios.post(`${SERVER_URL}/contact`, formData);
			console.log(response);
			if (response) {
				this.submitButtonDisabled = true;
				this.result = 'bg-success';
			}
		} catch (error) {
			console.error(error);
			this.submitButtonDisabled = false;
			this.result = 'bg-danger';
		}
	}
}
