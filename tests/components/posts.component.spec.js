import { providers } from 'ng-forward/testing';
// import PostsService from '../../app/scripts/components/posts/posts.service';
import sinon from 'sinon';
import 'reflect-metadata';

let PostsService;

describe('PostService', () => {
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
      provide('$resource', { useValue: $resource })
    ];
  }));

  // beforeEach(() => {
  //   let fixture = tcb.create(HomeComponent);
  //   let fixtureElement = fixture.debugElement;
  //   let component = fixture.debugElement.componentViewChildren[0];
  // });

  it('mocks the posts data service', () => {
    expect(PostsService.query).toBeDefined();
    // expect(PostsService.query).toHaveBeenCalled();
  })

  // it('successfully compiles', () => {
  //   expect(component).toBeDefined();
  //   // expect(component.nativeElement).toBeDefined();
  //   expect(component.componentInstance).toBeDefined();
  // });
});
