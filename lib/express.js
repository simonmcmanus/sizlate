
exports.__express = function(filename, options, callback) {

	// setup defaults
	options.settings = {
		views: (options && options.settings && options.settings.views) || './',
		'view engine': options.settings['view engine'] || 'sizlate'
	};

	console.log(options.settings['view engine'] );
	var selectors = options.selectors;
	var wait = false;
	var count = 0; // keep track of total number of callbacks to wait for
	var complete = 0; // completed callbacks count.
	for(var key in selectors) {
		if(selectors[key] && selectors[key].partial){// this is a partial.
			if(selectors[key].data && selectors[key].data.length > 0){ // make sure we are passed in data and that the data is not empty.

				wait = true;
				count++;
				console.log('c', fs.readFile, options.settings.views + '/partials/' + selectors[key].partial + '.'+ options.settings['view engine'])
				fs.readFile(options.settings.views + '/partials/' + selectors[key].partial + '.'+ options.settings['view engine'], function (key, err, data) {
					console.log('c',exports.doRender, data, selectors[key].data, selectors[key]));
					selectors[key] = exports.doRender(data, exports.classifyKeys(selectors[key].data, selectors[key]));	// adding and then stripping body tag for jsdom.
					complete++;
					console.log(complete);
					if(complete === 1) {
						doRendering();
					}
				}.bind({}, key));
			}
		}
	}

	var doRendering = function() {
		if(options.layout) {
			console.log(options.settings['view engine']);
			exports.variations[domain].get(options.settings.views + '/' + options.layout + '.'+ options.settings['view engine'], function(error, template) {
				exports.variations[domain].get(options.settings.views + '/' + filename + '.'+ options.settings['view engine'], function(err,data){
					if(err) {
						console.error("Could not open file: %s", err);
						process.exit(1);
					}
					var selectors = {};
					selectors[options.container || '#container'] = data;
					var markup = exports.doRender(template,  selectors) ;
					callback(null, exports.doRender(markup, options.selectors));
				});
			});
		} else { // no layouts specified, just do the render.
			exports.variations[domain].get(options.settings.views  + '/' +  filename + '.'+ options.settings['view engine'], function(err,data){
				if(err) {
					console.error("Could not open file: %s", err);
					process.exit(1);
				}
				callback(null, exports.doRender(data, options.selectors));

			});
		}
	};
	if(!wait) {
		doRendering();
	}
};
