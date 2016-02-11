'use strict';

/**
* FUNCTION: pluck( data, key )
*	Extracts a list of property values. The list consists of two-element tuples where the first element is the element index and the second element is the extracted value.
*
* @param {Object[]} data - input data
* @param {String} key - key on which to select values
* @returns {Array[]} array of tuples, where each tuple consists of the value index and the extracted value
*/
function pluck( data, key ) {
	var out;
	var i;
	out = new Array( data.length );
	for ( i = 0; i < out.length; i++ ) {
		out[ i ] = [ i, data[i][key] ];
	}
	return out;
} // end FUNCTION pluck()


// EXPORTS //

module.exports = pluck;