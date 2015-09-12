

<h1>Sizlate</h1>

Sizlate is an HTML templating engine for <a href="http://expressjs.com">Express.js</a>.

Sizlate requires NO special syntax, your templates only contain valid HTML.

Templates are populated using sizzle selectors (as used in jQuery).

<h1>Install</h1>

	npm install sizlate

<h2>Examples</h2>

<h3>Simple text example</h3>
<pre>
<code>
	app.get('/', function(req, res) {
		res.render('home', {
			selectors: {
				'a': 'hi there'
			}
		});
	});

</code>
</pre>
See /examples/basic

<ul>
<li>Note that the text in the template is overridden. This allows you to pre-populate a design templates with dummy data. </li>
<li>Please also note that the template should only have one root html element. This is a known issue.</li>
</ul>
<h3>Populating a node using a javascript object</h3>
<pre>
<code>
	app.get('/', function(req, res) {
		res.render('home', {
			selectors: {
				'a': {
					href: 'http://yahoo.com',
					title: 'yahoo',
					innerHTML: 'yahoo'
				}
			}
		});
	});
</code>
</pre>
<h3>Using regex</h3>
<pre>
<code>
	app.get('/', function(req, res) {
		res.render('home', {
			selectors: {
				'a': {
					href: {
						regex : /.*/,
						value : 'http://yahoo.com$1'
					}
				}
			}
		});
	});
</code>
</pre>


See /examples/object


All these values will override the existing value except className which will be added on to the end of any existing classes.



<h3>Partial Example</h3>


With partials if you do not specify a class name for the keys in the data the keys will be converted into a class.
<pre>
<code>
	app.get('/', function(req, res) {
		res.render('home', {
			selectors: {
				'ul#list': {
					partial: 'part',
					data: [
						{
							name: 'bob'
						},
						{
							name: 'anna'
						}
					]
				}
			}
		});
	});



	app.listen(8000);
	console.log('check out http://localhost:8000');
</code>
</pre>

See /examples/partial

<ul>
	<li>If no data is passed in the partial will render without any data</li>
	<li>If an empty array is passed into data the partial will not be displayed at all.</li>
</ul>


The template is inserted into a div with an id of container (#container) in layout.html.

See the examples folder for more examples.



Requires <a href="http://expressjs.com/">express.js</a> and <a href="http://nodejs.org/">node.js</a>.



<h1>Express 3.0 Changes with Sizlate 0.7.0</h1>

All template files must use .sizlate extension. (if someone can fix I would happily go back to .html)

Do not specify file extensions for templates or partials. Examples have all been updated.

Its now using Cheerio instead of JSOM which should make things much faster.

Other than the changes mentioned above the API should remain the same.

Any problems please create an issue.
