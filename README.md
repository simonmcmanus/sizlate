<h1>Sizlate</h1>

Sizlate is an experimental HTML <a href="http://expressjs.com/guide.html#template-engines">templating engine for Express.js</a>

Sizlate requires NO special syntax in the views, your templates are valid HTML files. 

Templates are populated using sizzle selectors (as used in jQuery).

<h2>Example</h2>

<h3>Simple Text example</h3>
<pre>
<code>	
app.get('/', function(req, res){
	res.render('container.html', {
		locals: {
			selectors: {
				'h1':'Home Page'
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
		locals: {
			selectors: {
				'a': {
					innerHTML: 'simonmcmanus.com',
					href: 'http://simonmcmanus.com',
					title: 'simonmcmanus.com',
					className:'external'
				}
			}
		}
	});
});
</code>
</pre>

Sizlate uses JSDOM and Sizzle.

Requires <a href="http://expressjs.com/">express.js</a> and <a href="http://nodejs.org/">node.js</a>.

The template is inserted into a div with an id of container (#container) in layout.html.