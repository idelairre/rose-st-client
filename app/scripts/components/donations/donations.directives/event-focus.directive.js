import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[event-focus]'
})

@Inject('$scope', '$element')
export default class EventFocus {
  constructor($scope, $element) {
    this.$element = $element;
    this.$scope = $scope;
    this.$scope.$watch(::this.evalFocus, ::this.setFocus);
  }

  evalFocus() {
    return this.$scope.currencyInputCtrl.focus;
  }

  setFocus(current, previous) {
    if (current) {
      setTimeout(() => {
        this.$element[0].focus();
        this.$scope.$apply();
        console.log('parent focus value: ', this.$scope.currencyInputCtrl.focus);
      }, 50);
    }
  }
}
