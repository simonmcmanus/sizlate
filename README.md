<h1>Sizlate</h1>

Sizlate is an experimental <a href="http://expressjs.com/guide.html#template-engines">templating engine for Express.js</a>

Sizlate requires NO special syntax in the views, your templates are valid HTML files. 

Templates are populated using sizzle selectors (as used in jQuery)

Requires express.js

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
<hr />



<h3>Object example</h3>
<pre>
<code>	
app.get('/', function(req, res){
	res.render('container.html', {
		locals: {
			selectors: {
				'a': {
					innerHTML: 'link text',
					href: 'alt text',
					title: 'title text',
					className:'linkClass'
				}
			}
		}
	});
});
</code>
</pre>



