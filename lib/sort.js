'use strict';

// MODULES //

var descending = require( './descending.js' );
var ascending = require( './ascending.js' );


// SORT //

/**
* FUNCTION: sort( data, dir )
*	Sorts tuple data in a specified direction.
*
* @param {Array[]} data - data to sort
* @param {String} dir - sort direction
* @returns {Array[]} sorted data
*/
function sort( data, dir ) {
	if ( dir === 'desc' ) {
		data.sort( descending );
	} else {
		data.sort( ascending );
	}
	return data;
} // end FUNCTION sort()


// EXPORTS //

module.exports = sort;