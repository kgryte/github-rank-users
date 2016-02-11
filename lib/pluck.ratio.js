'use strict';

/**
* FUNCTION: ratio( data, key1, key2 )
*	Computes the ratio of property values. The list consists of two-element tuples where the first element is the element index and the second element is the computed ratio.
*
* @param {Object[]} data - input data
* @param {String} key1 - numerator key
* @param {String} key2 - denominator key
* @returns {Array[]} array of tuples, where each tuple consists of the value index and the computed ratio
*/
function ratio( data, key1, key2 ) {
	var out;
	var i;
	var r;
	out = new Array( data.length );
	for ( i = 0; i < out.length; i++ ) {
		r = data[i][key1] / data[i][key2];
		out[ i ] = [ i, r ];
	}
	return out;
} // end FUNCTION ratio()


// EXPORTS //

module.exports = ratio;