import { Component, EventEmitter, Inject } from 'ng-forward';
import CurrencyInput from './currency-input.component';

const ENTER_KEY = 13;

@Component({
  selector: 'donation-button',
  controllerAs: 'donationButtonCtrl',
  directives: [CurrencyInput],
  inputs: ['value', 'keyup', 'hidden', 'clicked'],
  outputs: ['checkout', 'reset'],
  template: `
  <div class="input-group" ng-model="donationButtonCtrl.clicked">
    <span class="input-group-btn">
      <currency-input css="btn btn-default" placeholder="set amount" ng-show="!donationButtonCtrl.hidden" [(value)]="donationButtonCtrl.value" (keyup)="donationButtonCtrl.keyup($event)"></currency-input>
      <button class="btn btn-default" ng-show="donationButtonCtrl.hidden" (click)="donationButtonCtrl.click()">Donate {{ donationButtonCtrl.value }}</button>
    </span>
  </div>
  `
})

@Inject('$document', '$element', '$rootScope', '$scope')
export default class DonationButton {
  @Input() value;
  @Input() keyup;
  @Input() clicked;
  @Output() checkout;
  constructor($document, $element, $rootScope, $scope) {
    this.$document = $document;
    this.$element = $element;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.hidden = false;
    this.checkout = new EventEmitter();
    this.reset = new EventEmitter();
    this.hasFocus = false;
    this.$scope.$on('esc', ::this.esc);
  }

  focus(event) {
    this.hasFocus = true;
  }

  esc(event) {
    if (this.clicked === true) {
      this.clicked = false;
      this.hidden = false;
      this.reset.next();
      this.$scope.$digest();
    }
  }

  keyup(event) {
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
