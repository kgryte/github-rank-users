'use strict';

// MODULES //

var tape = require( 'tape' );
var rank = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof rank, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof rank.factory, 'function', 'export includes a factory method' );
	t.end();
});
