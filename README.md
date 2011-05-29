<h1>Sizlate</h1>

Sizlate is an experimental HTML templating engine for <a href="http://expressjs.com">Express.js</a>.

Sizlate requires NO special syntax, your templates are valid HTML files. 

Templates are populated using sizzle selectors (as used in jQuery).

<h2>Examples</h2>

<h3>Simple text example</h3>
<pre>
<code>	
app.get('/', function(req, res){
	res.render('container.html', {
		selectors: {
			'h1':'Home Page',
			'.nav a': {
				innerHTML: 'Sizlate',
				href: 'https://github.com/simonmcmanus/sizlate/',
				title: 'Sizzle templating for Express.js',
				className:'external'
			}
		}
	});
});
</code>
</pre>

<h3>Object example</h3>
<pre>
<code>	
app.get('/', function(req, res){
	res.render('container.html', {
		selectors: {
			'a': {
				innerHTML: 'simonmcmanus.com',
				href: 'http://simonmcmanus.com',
				title: 'simonmcmanus.com',
				className:'external'
			}
		}
	
	});
});
</code>
</pre>

See app.js for more examples.

Sizlate uses JSDOM and Sizzle.

Requires <a href="http://expressjs.com/">express.js</a> and <a href="http://nodejs.org/">node.js</a>.

The template is inserted into a div with an id of container (#container) in layout.html.