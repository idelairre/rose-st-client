import { Component } from 'ng-forward';
import { providers, TestComponentBuilder } from 'ng-forward/testing';
// import { ng } from 'ng-forward/cjs/tests/angular';
import sinon from 'sinon';
import 'reflect-metadata';

import PostsService from '../../app/scripts/components/posts/posts.service';
import MainComponent from '../../app/scripts/components/main/main.component';

@Component({
  selector: 'test-cmp',
  template: '<div></div>'
})

class Test { }

let component, fixture, fixtureElement, html, tcb, $resource, mockPostsService;

describe('MainComponent', () => {
  beforeEach(providers(provide => {
    mockPostsService = {
      query: sinon.stub().returns('mock success'),
      get: sinon.stub().returns('mock success')
    };

    $resource = {
      query: sinon.stub(),
      get: sinon.stub()
    };

    return [
      provide(PostsService, { useValue: mockPostsService }),
      provide('$resource', { useValue: $resource }),
    ];
  }));

  beforeEach(done => {
    tcb = new TestComponentBuilder();
    html = '<rose-st-client></rose-st-client>';
    tcb.overrideTemplate(Test, html).createAsync(MainComponent).then(result => {
      fixture = result;
      fixtureElement = fixture.debugElement;
      component = fixture.debugElement.componentViewChildren[0];
      done();
    });
  });

  it('successfully compiles', () => {
    component = fixture.debugElement.componentViewChildren[0];
    expect(component).toBeDefined();
    expect(component.nativeElement).toBeDefined();
    expect(component.componentInstance).toBeDefined();
  });
});
