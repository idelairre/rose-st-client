# Rose St. Community Center

Angular/ng-forward app to collect donations for the 100 Block Homicide Free Zone project via Stripe.

# Development notes

+ Input/output decorators do not work for ng-forward
+ Refactor to Angular 2 will be prohibited by the use of scope and Angular 1 libraries, look into ng-metadata or the feasability of moving directly to Angular 2 with ng-upgrade
+ Not yet sure how analytics will work for Angular 2
+ Removed `koa-connect-history-api-fallback` because it didn't seem to do anything

## Build & development

Run `npm run watch` for preview.

## Testing

Running `npm run test` will run the unit tests with karma.
