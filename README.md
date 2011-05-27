Sizlate is an experimental <a href="http://expressjs.com/guide.html#template-engines">templating engine for Express.js</a>

Sizlate requires NO special syntax in the views, your templates are valid HTML files. 

Templates are populated using sizzle selectors (as used in jQuery)

<h2>Example</h2>


app.get('/', function(req, res){
	res.render('container.html', {
		locals: {
			selectors: {
				'h1:eq(1)':'Home Page',
				'ul li': ['item 1', 'item2', 'item3', 'item4', 'item5', 'item6'] ,
				'footer a': {
					innerHTML: 'link text',
					href: 'alt text',
					title: 'title text',
					className:'bob'
				}				
			}
		}
	});
});




