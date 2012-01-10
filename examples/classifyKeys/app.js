var express = require('express');
var sizlate = require('../../sizlate');


var app =  express.createServer();
app.register('.html', sizlate);


app.configure( function () {
  app.set('dirname', __dirname);
});


/*

TODO: CONFIRM DEFAULTS HERE
*/
app.get('/', function(req, res) {
	res.render(__dirname+'/views/home.html', {
		selectors: {
			'#comments': {
				partial: 'comment.html',
				classifyKeys: true,
				data: [{
					author: 'Simon McManus',
					comment: 'Partial example.',
					date: '12th December 1991'
				},
				{
					author: 'Harry Beagle',
					comment: 'Partial example 1.',
					date: '12th December 1992'
				},
				{
					author: 'UNKNOWN',
					comment: 'Partial example 2.',
					date: '12th December 1993'
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

