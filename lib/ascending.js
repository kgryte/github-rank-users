'use strict';

/**
* FUNCTION: ascending( a, b )
*	Comparator function for sorting values in ascending order.
*
* @private
* @param {Number[]} a - first value
* @param {Number[]} b - second value
* @returns {Number} comparison outcome
*/
function ascending( a, b ) {
	return a[ 1 ] - b[ 1 ];
} // end FUNCTION ascending()


// EXPORTS //

module.exports = ascending;