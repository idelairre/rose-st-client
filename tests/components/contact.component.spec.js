import { providers, TestComponentBuilder } from 'ng-forward/testing';
import ContactComponent from '../../app/scripts/components/contact/contact.component';

// NOTE: testing for ng-forward seems to be completely busted. Will have to settle for e2e tests with Selenium

const tcb = new TestComponentBuilder();

let component, fixture, fixtureElement;

describe('ContactComponent', () => {
  beforeEach(() => {
    fixture = tcb.create(ContactComponent);
    fixtureElement = fixture.debugElement;
    component = fixture.debugElement.componentViewChildren[0];
  });

  it('successfully compiles', () => {
    expect(component).toBeDefined();
  });
});
