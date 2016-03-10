import { Component } from 'ng-forward';
import { providers, TestComponentBuilder } from 'ng-forward/testing';
import sinon from 'sinon';
import 'reflect-metadata';

let MainComponent = require('../../app/scripts/components/main/main.component');

@Component({
  selector: 'test-cmp',
  template: '<div></div>'
})

class Test { }

describe('MainComponent', () => {
  let component, tcb, html;
  tcb = new TestComponentBuilder();

  it('successfully compiles', (done) => {
    html = '<rose-st-client></rose-st-client>';
    tcb.overrideTemplate(Test, html).createAsync(Test).then(fixture => {
      let MainComponent = fixture.debugElement.componentViewChildren[0];
      expect(MainComponent).toBeDefined();
      done();
    });
  });
});
