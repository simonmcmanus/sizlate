var sizlate = require('./sizlate.js');
var app = require('express').createServer();

app.set( "view engine", "html" );
app.register( ".html", sizlate);

app.get('/', function(req, res){
	res.render('pageTemplate', {
		locals: {
			selectors: {
				'h1':'REPLACED: template test title',
				'#1':'bad dog',
				'ul li': ['item 1', 'item2', 'item3']
			}
		}
	});sd
});

app.listen(8000);



