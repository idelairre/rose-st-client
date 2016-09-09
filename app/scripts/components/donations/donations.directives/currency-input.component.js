import { Component, Inject } from 'ng-forward';
import EventFocus from './event-focus.directive';

@Component({
  selector: 'currency-input',
  controllerAs: 'currencyInputCtrl',
  providers: ['ui.utils.masks'],
  directives: [EventFocus],
  inputs: ['focus', 'value'],
  template: '<input class="{{ currencyInputCtrl.css }}" id="donationInput" click-away event-focus="currencyInputCtrl.focus" placeholder="{{ currencyInputCtrl.placeholder }}" type="text" ng-model="currencyInputCtrl.value" ui-money-mask="2" min="10"></input>'
})

@Inject('$attrs')
export default class CurrencyInput {
  constructor($attrs) {
    this.$attrs = $attrs;
    this.placeholder = this.$attrs.placeholder;
    this.css = this.$attrs.css;
    console.log(this);
  }
}
