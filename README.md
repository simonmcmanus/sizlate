<h1>Sizlate</h1>

Sizlate is an experimental HTML templating engine for <a href="http://expressjs.com">Express.js</a>.

Sizlate requires NO special syntax, your templates are valid HTML files. 

Templates are populated using sizzle selectors (as used in jQuery).

Sizlate will be available as an npm package very soon.

<h2>Examples</h2>

<h3>Simple text example</h3>
<pre>
<code>	
	app.get('/', function(req, res) {
		res.render('home.html', {
			selectors: {
				'a': 'hi there'
			}	
		});
	});

</code>
</pre>
See /examples/basic

<p>
Note that the text in the template is overridden. This allows you to pre-populate a design templates with dummy data.  
</p>

<h3>Populating a node using a javascript object</h3>
<pre>
<code>	
	app.get('/', function(req, res) {
		res.render('home.html', {
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
See /examples/object


All these values will override the existing value except className which will be added on to the end of any existing classes.



<h3>Partial Example</h3>


With partials if you do not specify a class name for the keys in the data the keys will be converted into a class.
<pre>
<code>	
	app.get('/', function(req, res) {
		res.render('home.html', {
			selectors: {
				'ul#list': {
					partial: 'part.html',
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
</code>
</pre>

See /examples/partial

<ul>
	<li>If no data is passed in the partial will render without any data</li>
	<li>If an empty array is passed into data the partial will not be displayed at all.</li>
</ul>




See the examples folder for more examples.


Sizlate uses JSDOM and Sizzle.

Requires <a href="http://expressjs.com/">express.js</a> and <a href="http://nodejs.org/">node.js</a>.

The template is inserted into a div with an id of container (#container) in layout.html.