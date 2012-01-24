var express = require('express');
var sizlate = require('sizlate');

var app = express.createServer();
app.register('.html', sizlate);

app.configure( function () {
  app.set('dirname', __dirname);
});

app.get('/', function(req, res) {
	res.render(__dirname+'/views/home.html', {
		selectors: {
			'ul#list': {
				partial: 'part.html',
				data: [
					{ '.name': 'Bob' },
					{ '.name': 'Anna' }
				]
			}
		}
	});
});


sizlate.startup(app,
function(app) {
    app.listen(8000);
    console.log('check out http://localhost:8000');
});

