import axios from 'axios';
import { Component, Inject } from 'ng-forward';
import { SERVER_URL } from '../../constants/constants';
import 'babel-polyfill';

@Component({
	selector: 'contact',
	template: require('./contact.html'),
	controllerAs: 'contactCtrl',
	providers: ['ngMessages']
})

@Inject('$scope')
export default class ContactCtrl {
	constructor($scope) {
		this.$scope = $scope;
		this.result = 'hidden'
		this.resultMessage = '';
		this.formData = {};
		this.submitButtonDisabled = false;
		this.submitted = false;

	}

	async submit(formData) {
		try {
			let response = await axios.post(`${SERVER_URL}/messages`, { message: formData });
			console.log(response);
			this.submitted = true;
			this.result = 'bg-success';
			this.resultMessage = 'Success! Expect to hear from us soon';
			this.$scope.$digest();
		} catch (error) {
			console.error(error);
			this.result = 'bg-danger';
			this.resultMessage = `Post failed: ${error}`;
			this.$scope.$digest();
		}
	}
}
