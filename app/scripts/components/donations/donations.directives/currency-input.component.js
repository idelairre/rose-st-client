import { Component, Inject, Input } from 'ng-forward';
import EventFocus from './event-focus.directive';

@Component({
  selector: 'currency-input',
  controllerAs: 'currencyInputCtrl',
  providers: ['ui.utils.masks'],
  directives: [EventFocus],
  template: '<input id="donationInput" click-away event-focus="currencyInputCtrl.focus" name="{{ currencyInputCtrl.name }}" class="{{ currencyInputCtrl.css }}" placeholder="{{ currencyInputCtrl.placeholder }}" type="text" ng-model="currencyInputCtrl.value" ui-money-mask="2" min="10"></input>',
  inputs: ['focus', 'name', 'value', 'css', 'placeholder']
})

@Inject('$scope', '$element')
export default class CurrencyInput {
  @Input() focus;
  @Input() name;
  @Input() value;
  @Input() css;
  @Input() placeholder;
  constructor($scope, $element) {
    this.$element = $element;
    this.$scope = $scope;
  }
}
