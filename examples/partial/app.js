var express = require('express');
var sizlate = require('../../sizlate');


var app =  express.createServer();
app.register('.html', sizlate);

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


sizlate.startup(app, function(app) {
	app.listen(8000);
	console.log('check out http://localhost:8000');
});

