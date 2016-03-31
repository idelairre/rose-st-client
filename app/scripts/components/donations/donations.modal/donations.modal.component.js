import { Component, Inject } from 'ng-forward';
import '../donations.css';
import 'babel-polyfill';

@Component({
	selector: 'donations-modal',
  controllerAs: 'donationsModalCtrl',
	template: require('./donations.modal.html'),
  providers: ['ui.bootstrap.modal']
})

@Inject('$filter', '$uibModalInstance')
export default class DonationsModal {
  constructor($filter, $uibModalInstance, result) {
    this.$uibModalInstance = $uibModalInstance;
    this.receipt = {
			id: result.config.data.token,
			amount: $filter('currency')(result.config.data.amount / 100),
      date: $filter('date')(new Date(), 'shortDate')
    }
    // console.log(this.receipt);
  }

  ok() {
    ::this.$uibModalInstance.close();
  }

	print() {
		window.print();
	}

  dismiss() {
    ::this.$uibModalInstance.dismiss('cancel');
  }
}
