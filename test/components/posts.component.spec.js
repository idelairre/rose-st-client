import { Component } from 'ng-forward';
import { providers, TestComponentBuilder } from 'ng-forward/testing';
import sinon from 'sinon';
import 'reflect-metadata';

import PostsService from '../../app/scripts/components/posts/posts.service';
import PostsComponent from '../../app/scripts/components/posts/posts.component';

@Component({
  selector: 'test-cmp',
  template: '<div></div>'
})

class Test { }

let component, fixture, fixtureElement, html, tcb, $resource, mockPostsService;

describe('PostsComponent', () => {
  beforeEach(providers(provide => {
    mockPostsService = {
      query: sinon.stub().returns('mock success'),
      get: sinon.stub().returns('mock success')
    };

    // $resource = {
    //   query: sinon.stub(),
    //   get: sinon.stub()
    // };

    return [
      provide(PostsService, { useValue: mockPostsService }),
      // provide('$resource', { useValue: $resource })
    ];
  }));

  beforeEach(done => {
    tcb = new TestComponentBuilder();
    html = '<posts></posts>';
    tcb.overrideTemplate(Test, html).createAsync(PostsComponent).then(result => {
      fixture = result;
      fixtureElement = fixture.debugElement;
      component = fixture.debugElement.componentViewChildren[0];
      done();
    });
  });

  it('mocks the posts data service', () => {
    expect(mockPostsService.query).toHaveBeenCalled();
  })

  it('successfully compiles', () => {
    component = fixture.debugElement.componentViewChildren[0];
    expect(component).toBeDefined();
    expect(component.nativeElement).toBeDefined();
    expect(component.componentInstance).toBeDefined();
  });
});
