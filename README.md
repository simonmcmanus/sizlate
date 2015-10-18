<h1>Sizlate</h1>

Sizlate is an HTML templating engine.

Sizlate requires NO special syntax, your templates only contain valid HTML.

Templates are populated using sizzle selectors (as used in jQuery).

From v1.0.0 Sizlate works in the browser.

Can can pass render a string of html, or a dom Node. If you specify a DOM node the rendering will happen on the page.

<h1>Install</h1>

	npm install sizlate

<h2>Examples</h2>

<h3>Simple text example</h3>
<pre>
<code>
var html = '<div id="example"></div>';
var selectors = {
	'#example': 'Hello World'
};
var out = sizlate.render(html, selectors);

</code>
</pre>
See /examples


<h1>Express Users</h1>

This new version of sizlate does not support express.

For the moment you will need to use an older version of sizlate.

The functionality is being moved into https://github.com/simonmcmanus/sizlate-express
