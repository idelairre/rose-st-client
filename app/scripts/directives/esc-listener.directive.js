import { Directive, Inject } from 'ng-forward';

const ESC_KEY = 27;

@Directive({
  selector: '[esc-listener]'
})

@Inject('$document', '$rootScope')
export default class EscListener {
  constructor($document, $rootScope) {
    this.$document = $document;
    this.$rootScope = $rootScope;
    this.$document.bind('keydown', $event => {
      if ($event.keyCode === ESC_KEY) {
        $event.preventDefault();
        this.$rootScope.$broadcast('esc', $event);
      }
    });
  }
}
