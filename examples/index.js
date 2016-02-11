'use strict';

var rank = require( './../lib' );
var data = require( './data.json' );

var opts = {
	'method': 'ffratio'
};

rank( data, opts, clbk );

function clbk( error, results, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}