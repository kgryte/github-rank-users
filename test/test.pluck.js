'use strict';

// MODULES //

var tape = require( 'tape' );
var pluck = require( './../lib/pluck.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof pluck, 'function', 'main export is a function' );
	t.end();
});

tape( 'function returns a list of property values', function test( t ) {
	var expected;
	var actual;
	var d;

	d = [{'a':1},{'a':2},{'a':3}];

	expected = [ 1, 2, 3 ];
	actual = pluck( d, 'a' );

	t.deepEqual( actual, expected, 'returns list of property values' );
	t.end();
});
