var sizlate = require('./sizlate.js');
var app = require('express').createServer();

app.set( "view engine", "html" );
app.register('.html', sizlate);


app.get('/', function(req, res){
	res.render('container.html', {
		locals: {
			selectors: {
				'h1:eq(1)':'Home Page',
				'h2':'Welcome to the home page.',
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

app.get('/1', function(req, res){
	res.render('container.html', {
		locals: {
			selectors: {
				'h1:eq(1)':'Page 1',
				'h2':'Welcome to page 1',
				'ul li a': ['item 1', 'item2', 'item3', 'item4', 'item5', 'item6'] ,
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

app.listen(8000);



