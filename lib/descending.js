'use strict';

/**
* FUNCTION: descending( a, b )
*	Comparator function for sorting values in descending order.
*
* @private
* @param {Number[]} a - first value
* @param {Number[]} b - second value
* @returns {Number} comparison outcome
*/
function descending( a, b ) {
	return b[ 1 ] - a[ 1 ];
} // end FUNCTION descending()


// EXPORTS //

module.exports = descending;