'use strict';

// MODULES //

var factory = require( './factory.js' );


// RANK //

/**
* FUNCTION: rank( data[, opts], clbk )
*	Ranks users provided user detail data.
*
* @param {Object[]} data - user detail data
* @param {Object} [opts] - function options
* @param {String} [opts.token] - Github access token
* @param {String} [opts.useragent] - user agent string
* @param {String} [opts.method="followers"] - rank method
* @param {Function} clbk - callback to invoke upon completing analysis
* @returns {Void}
*/
function rank( data, opts, clbk ) {
	if ( arguments.length < 3 ) {
		// Assume `opts` arg is the callback...
		return factory( {}, opts )( data );
	}
	factory( opts, clbk )( data );
} // end FUNCTION rank()


// EXPORTS //

module.exports = rank;
