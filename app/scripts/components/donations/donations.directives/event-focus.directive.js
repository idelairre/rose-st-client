import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[event-focus]'
})

@Inject('$attrs', '$scope', '$element')
export default class EventFocus {
  constructor($attrs, $scope, $element) {
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
