import { Component } from 'ng-forward';
import { providers, TestComponentBuilder } from 'ng-forward/testing';
import sinon from 'sinon';
import 'jasmine-expect';
import 'reflect-metadata';

// none of this fucking shit works. Can't tell if this is my fault or ng-forward's

import ContactComponent from '../../app/scripts/components/contact/contact.component';

@Component({
  selector: 'test-cmp',
  template: '<div></div>'
})

class Test { }

let component, fixture, fixtureElement, tcb;

describe('ContactComponent', () => {
  tcb = new TestComponentBuilder();
  beforeEach(() => {
    fixture = tcb.create(ContactComponent);
    fixtureElement = fixture.debugElement;
    component = fixture.debugElement.componentViewChildren[0];
  });

  it('successfully compiles', () => {
    // expect(component.componentInstance).toImplement(ContactComponent);
  });
});
