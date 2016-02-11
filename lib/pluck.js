'use strict';

/**
* FUNCTION: pluck( data, key )
*	Extracts a list of property values.
*
* @param {Object[]} data - input data
* @param {String} key - key on which to select values
* @returns {Array} list of property values
*/
function pluck( data, key ) {
	var out;
	var i;
	out = new Array( data.length );
	for ( i = 0; i < out.length; i++ ) {
		out[ i ] = data[ i ][ key ];
	}
	return out;
} // end FUNCTION pluck()


// EXPORTS //

module.exports = pluck;