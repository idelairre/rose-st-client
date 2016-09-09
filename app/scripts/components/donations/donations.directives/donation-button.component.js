import { Component, EventEmitter, Inject } from 'ng-forward';
import CurrencyInput from './currency-input.component';

const ENTER_KEY = 13;

@Component({
  selector: 'donation-button',
  controllerAs: 'donationButtonCtrl',
  directives: [CurrencyInput],
  inputs: ['value', 'keyup', 'clicked', 'hidden'],
  outputs: ['checkout', 'reset'],
  template: `
    <div class="input-group" ng-model="donationButtonCtrl.clicked">
      <span class="input-group-btn">
        <currency-input (focus)="donationButtonCtrl.focus" css="btn btn-default" placeholder="set amount" ng-show="!donationButtonCtrl.hidden" [(value)]="donationButtonCtrl.value" (keyup)="donationButtonCtrl.keyup($event)"></currency-input>
        <button class="btn btn-default" ng-show="donationButtonCtrl.hidden" (click)="donationButtonCtrl.click()">Donate {{ donationButtonCtrl.value | currency }}</button>
      </span>
    </div>
    `
})

@Inject('$element', '$scope')
export default class DonationButton {
  constructor($element, $scope) {
    this.$element = $element;
    this.$scope = $scope;
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
