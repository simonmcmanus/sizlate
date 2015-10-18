// 'use strict';
//
//
// module.exports = function(selectors, iterator, $page) {
// 	var selector;
// 	var out = [];
// 	for (selector in selectors) {
//
// 		// why?
// 		if(typeof selectors[selector] === 'function') {
// 			break;
// 		}
//
// 		var $domNode = $page(selector);
//
// 		if($domNode) {
// 			var output = iterator($domNode, selector, selectors[selector], $page);;
// 			console.log('out', output);
// 			out.push(output);
// 		}
// 	}
// 	return out.join(' ');
// };
