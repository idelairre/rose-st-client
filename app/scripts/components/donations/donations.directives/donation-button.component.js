import { Component, EventEmitter, Inject } from 'ng-forward';
import CurrencyInput from './currency-input.component';

const ESC_KEY = 27;
const ENTER_KEY = 13;

@Component({
  selector: 'donation-button',
  controllerAs: 'donationButtonCtrl',
  directives: [CurrencyInput],
  inputs: ['value', 'keyup', 'hidden'],
  outputs: ['checkout'],
  template: `
  <div class="input-group">
    <span class="input-group-btn">
      <currency-input css="btn btn-default" placeholder="set amount" ng-show="!donationButtonCtrl.hidden" [(value)]="donationButtonCtrl.value" (keyup)="donationButtonCtrl.keyup($event)"></currency-input>
      <button class="btn btn-default" ng-show="donationButtonCtrl.hidden" (click)="donationButtonCtrl.click()">Donate {{ donationButtonCtrl.value }}</button>
    </span>
  </div>
  `
})

@Inject('$document', '$rootScope', '$scope')
export default class DonationButton {
  @Input() value;
  @Input() keyup;
  @Output() checkout;
  constructor($document, $rootScope, $scope) {
    console.log(this);
    this.$document = $document;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.hidden = false;
    this.checkout = new EventEmitter();
    this.hasFocus = false;
    this.$scope.$on('esc', ::this.esc);
  }

  focus(event) {
    this.hasFocus = true;
    console.log(event);
  }

  esc(event) {
    console.log(event);
    this.hidden = false;
    this.$scope.$digest();
  }

  keyup(event) {
    console.log(event);
    if (event.keyCode === ENTER_KEY) {
      this.hidden = true;
    }
  }

  click() {
    if (!this.hidden) {
      return;
    }
    this.checkout.next();
  }
}
