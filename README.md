# Rose St. Community Center

Angular app to collect donations for the 100 Block Homocide Free Zone project via Stripe.

## Build & development

Run `grunt` for building and `grunt serve` for preview. Note: to run on localhost you must disable the following code in index.html since it will automatically redirect your browser to https.

	'<script type="text/javascript">
		if (window.location.protocol == "http:") {
			var restOfUrl = window.location.href.substr(5);
			window.location = "https:" + restOfUrl;
		}
	</script>'

## Testing

Running `grunt test` will run the unit tests with karma.
