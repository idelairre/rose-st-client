import { Component, Inject } from 'ng-forward';

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
    this.result = result;
    this.receipt = {
      amount: $filter('currency')(JSON.parse(result.config.data).amount / 100),
      address: '821 N. Rose St.',
      cityState: 'Baltimore, MD 21205',
      to: 'Rose St. Community Center',
      date: $filter('date')(new Date(), 'shortDate'),
      token: JSON.parse(result.config.data).token
    }
    console.log(this.receipt, this.result);
  }

  ok() {
    ::this.$uibModalInstance.close();
  }


  dismiss() {
    ::this.$uibModalInstance.dismiss('cancel');
  }
}
