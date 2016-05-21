/**
 * In the case of input we should update the value and not just set the innerHTML property.
 * @param  {Object} $node sizzle object
 * @param  {String} data  The value to be set on the html.
 */
module.exports = function ($node, data) {
	$node.each(function (i, elem) {
        var type = elem.tagName;

        if(this[i] && this[i].name) {
            type = this[i].name;
        }else {
            type = 'none';
        }
		if(type.toUpperCase() === 'INPUT') {
			$node.eq(i).attr('value', data);
		}else {
			$node.eq(i).html(data);
		}
	});
	return $node;
};
