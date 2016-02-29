import { Component, EventEmitter, Inject } from 'ng-forward';
import CurrencyInput from './currency-input.component';

const ENTER_KEY = 13;

@Component({
  selector: 'donation-button',
  controllerAs: 'donationButtonCtrl',
  directives: [CurrencyInput],
  inputs: ['name', 'value', 'keyup', 'hidden', 'clicked'],
  outputs: ['checkout', 'reset'],
  template: `
  <div class="input-group" ng-model="donationButtonCtrl.clicked">
    <span class="input-group-btn">
      <currency-input [focus]="donationButtonCtrl.focus" [name]="donationButtonCtrl.name" css="btn btn-default" placeholder="set amount" ng-show="!donationButtonCtrl.hidden" [(value)]="donationButtonCtrl.value" (keyup)="donationButtonCtrl.keyup($event)"></currency-input>
      <button class="btn btn-default" ng-show="donationButtonCtrl.hidden" (click)="donationButtonCtrl.click()">Donate {{ donationButtonCtrl.value | currency }}</button>
    </span>
  </div>
  `
})

@Inject('$document', '$element', '$rootScope', '$scope')
export default class DonationButton {
  @Input() value;
  @Input() keyup;
  @Input() clicked;
  @Input() hidden;
  @Input() name;
  @Output() checkout;
  @Output() reset;
  constructor($document, $element, $scope) {
    this.$document = $document;
    this.$element = $element;
    this.$scope = $scope;
    this.hidden = false;
    this.checkout = new EventEmitter();
    this.reset = new EventEmitter();
    this.focus = false;
    this.$scope.$on('esc', ::this.esc);
  }

  esc(event) {
    if (this.clicked === true) {
      this.clicked = false;
      this.hidden = false;
      this.focus = true;
      this.reset.next();
      this.$scope.$apply();
    }
  }

  keyup(event) {
    if (event.keyCode === ENTER_KEY) {
      if (this.value >= 10) {
        this.clicked = true;
        this.hidden = true;
        this.focus = false;
      }
    }
  }

  click() {
    if (!this.hidden) {
      return;
    }
    this.checkout.next();
  }
}
