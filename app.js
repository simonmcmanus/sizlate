var app = require('express').createServer();

var sizlate = require('sizlate');
app.register('.html', sizlate);

app.configure( function () {
  app.set('view engine', 'html');
  app.set('dirname', __dirname);
});

app.get('/', function(req, res) {
	res.render('container.html', {
		selectors: {
			'h1:eq(1)': 'Home Page',
			'h2': 'Welcome to the home page.',
			'ul li': ['item 1', 'item2', 'item3', 'item4', 'item5', 'item6'],
			'footer a': {
				innerHTML: 'link text',
				href: 'alt text',
				title: 'title text',
				className: 'bob'
			},	
			'.partial': {
				partial: 'partial.html',
				data: {
					'h2': 'HERE IS MY TITLE',
					'span': 'stick some text in here.'
				}
			}
		}
	});
});

app.get('/1', function(req, res) {
	res.render('container.html', {
		selectors: {
			'h1:eq(1)': 'Page 1',
			'h2': 'Welcome to page 1',
			'ul li': 'You made it to page one',
			'footer a': {
				innerHTML: 'link text',
				href: 'alt text',
				title: 'title text',
				className: 'bob'
			}				
		}
	});
});

sizlate.startup(app, function(app) {
	app.listen(8000);	
});
