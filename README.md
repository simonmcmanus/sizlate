#Sizlate

Sizlate is an HTML templating engine.

Sizlate requires no special syntax, your templates only contain valid HTML.

Templates are populated using sizzle selectors (as used in jQuery).

Can can pass render a string of html, or a dom Node. If you specify a DOM node the rendering will happen on the page.


##Examples


###Simple text example

```js

var html = '<div> id="example"></div>';
var selectors = {
	'#example': 'Hello World'
};
var out = sizlate.render(html, selectors);

```

```html
<div><a href="">UPDATED</a></div>
```



###ClassName

```js
var html = '<div><a class="class1"></a></div>';
var selectors = {
    'div a': {
        className: 'class2'
    }
};
var out = sizlate.render(html, selectors);
console.log(out);
```

###Arrays
```js
var html = '<ul><li></li></ul>';
var selectors = {
    'li': [
        'change links to this',
        'change links to this2',
        {
            'href': 'df',
            innerHTML: 'aaa'
        }
    ]
};
var out = sizlate.render(html, selectors);
console.log(out);
```

###Object
```js
var html = '<div><a></a></div>';
var selectors = {
    'a': {
        href: 'http://yahoo.com',
        title: 'yahoo',
        innerHTML: 'yahoo'
    }
};
var out = sizlate.render(html, selectors);
console.log(out);

```

###Regular Expression
```js
var html = '<div><a>existing text</a></div>';
var selectors = {
    'a': {
        'innerText': {
            regex: /existing ([a-z]+)/ig,
            value: 'new $1'
        }
    }
};
var out = sizlate.render(html, selectors);
console.log(out);

```

###Nested selector

```js
var html = '<div><div class="class1"><a></a></div></div>';
var selectors = {
        selectors: {
          a: 'change links to this'
        }
};
var out = sizlate.render(html, selectors);
console.log(out);
```


See /examples


###Clientside

From v1.0.0 Sizlate works in the browser.

```js
var domNode = document.getElementById('area');
var selectors = {'div': 'new content'};
sizlate.render(domNode, selectors);
```

```js
var $domNode = $('#area');
var selectors = {'div': 'new content'};
sizlate.render($domNode, selectors);
```

#Express

From sizlate v1 Express is not supported.

For the moment you will need to use an older version of sizlate.

The functionality is being moved into https://github.com/simonmcmanus/sizlate-express
