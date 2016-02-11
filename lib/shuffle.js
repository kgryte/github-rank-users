'use strict';

/**
* FUNCTION: shuffle( data, sorted )
*	Shuffle a data array based on a sort vector.
*
* @param {Object[]} data - data to shuffle
* @param {Array[]} sorted - sort vector, where each element is a two-element tuple in which the first tuple element is the value's original index
* @returns {Object[]} shuffled data array
*/
function shuffle( data, sorted ) {
	var out;
	var i;
	out = new Array( data.length );
	for ( i = 0; i < data.length; i++ ) {
		out[ i ] = data[ sorted[i][0] ];
	}
	return out;
} // end FUNCTION shuffle()


// EXPORTS //

module.exports = shuffle;