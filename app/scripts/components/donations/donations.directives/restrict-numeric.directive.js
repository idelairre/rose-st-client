import { Directive, Inject } from 'ng-forward';

@Directive({
  selector: '[restrict-numeric]',
})

@Inject('$element')
export default class RestrictNumeric {
  constructor($element) {
    $element.bind('keypress', ::this.restrictNumeric);
  }

  restrictNumeric(event) {
    if (event.metaKey || event.ctrlKey || event.which === 0 || event.which < 33) {
      return;
    }
    if (event.which === 32 || !!/[\d\s]/.test(String.fromCharCode(event.which)) === false) {
      event.preventDefault();
    }
  }
}
