'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var methods = require( './methods.json' );


// VARIABLES //

var METHODS = getKeys( methods ).join( ',' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} [options.token] - Github access token
* @param {String} [options.useragent] - user agent string
* @param {String} [options.method] - rank method
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'token' ) ) {
		opts.token = options.token;
		if ( !isString( opts.token ) ) {
			return new TypeError( 'invalid option. Token option must be a string primitive. Option: `' + opts.token + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. User agent option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'method' ) ) {
		opts.method = options.method;
		if ( !isString( opts.method ) ) {
			return new TypeError( 'invalid option. Method option must be a string primitive. Option: `' + opts.method + '`.' );
		}
		if ( methods[ opts.method ] === void 0 ) {
			return new Error( 'invalid option. Unrecognized method option. Must be one of the following: [' + METHODS + '. Option: `' + opts.method + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
