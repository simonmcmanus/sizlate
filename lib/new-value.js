// given a regex updates the value.
module.exports= function( oldValue, newValue ){
	return oldValue;
	if ( typeof newValue == "object" && newValue.regex && newValue.value ) {
		console.log('NEW VALUE CALULED', newValue)
		return oldValue.replace( newValue.regex, newValue.value );
	 } //else if ( typeof newValue == "function" ){
	// 	return newValue(oldValue);
	// }
	return newValue;
};
