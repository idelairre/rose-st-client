import { Component, Inject, Input } from 'ng-forward';
import RestrictNumeric from './restrict-numeric.directive';

String.prototype.splice = function(idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

@Component({
  selector: 'currency-input',
  controllerAs: 'currencyInputCtrl',
  directives: [RestrictNumeric],
  template: '<input class="{{ currencyInputCtrl.css }}" placeholder="{{ currencyInputCtrl.placeholder }}" type="text" ng-model="currencyInputCtrl.value"></input>',
  inputs: ['value', 'css', 'placeholder']
})

@Inject('$scope', '$element', '$attrs')
export default class CurrencyInput {
  @Input() value;
  @Input() css;
  constructor($scope, $element, $attrs) {
    this.$scope = $scope;
    this.input = $element.find('input')[0];
    console.log($element, this.input);
    $element.bind('keyup', ::this.format);
  }

  format() {
    let inputVal = angular.element(this.input).val();

    //clearing left side zeros
    while (this.value.charAt(0) == '0') {
      this.value = this.value.substr(1);
    }

    this.value = this.value.replace(/[^\d.\',']/g, '');

    let point = this.value.indexOf('.');
    if (point >= 0) {
      this.value = this.value.slice(0, point + 3);
    }

    let decimalSplit = this.value.split('.');
    let intPart = decimalSplit[0];
    let decPart = decimalSplit[1];

    intPart = intPart.replace(/[^\d]/g, '');
    if (intPart.length > 3) {
      let intDiv = Math.floor(intPart.length / 3);
      while (intDiv > 0) {
        let lastComma = intPart.indexOf(',');
        if (lastComma < 0) {
          lastComma = intPart.length;
        }

        if (lastComma - 3 > 0) {
          intPart = intPart.splice(lastComma - 3, 0, ',');
        }
        intDiv--;
      }
    }

    if (decPart === undefined) {
      decPart = '';
    } else {
      decPart = '.' + decPart;
    }
    let res = intPart + decPart;

    this.$scope.$apply(() => {
      this.value = '$' + res;
    });
  }
}
