'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var merge = require( 'utils-merge2' )();
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var analyze = require( './analyze.js' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for ranking users.
*
* @param {Object} options - function options
* @param {String} [options.token] - Github access token
* @param {String} [options.useragent] - user agent string
* @param {String} [options.method="followers"] - rank method
* @param {Function} clbk - callback to invoke upon ranking users
* @returns {Function} function for ranking users
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = merge( {}, defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: rank( data )
	*	Ranks users provided user detail data.
	*
	* @param {Object[]} data - user detail data
	* @returns {Void}
	*/
	return function rank( data ) {
		analyze( data, opts, done );
		/**
		* FUNCTION: done( error, results, info )
		*	Callback invoked after completing analysis.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object} results - analysis results
		* @param {Object} info - rate limit info
		* @returns {Void}
		*/
		function done( error, results, info ) {
			error = error || null;
			results = results || null;
			info = info || null;
			clbk( error, results, info );
		} // end FUNCTION done()
	}; // end FUNCTION rank()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
