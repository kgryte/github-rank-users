'use strict';

// MODULES //

var tape = require( 'tape' );
var pluck = require( './../lib/pluck.ratio.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof pluck, 'function', 'main export is a function' );
	t.end();
});

tape( 'function returns an array of tuples consisting of an element index and a ratio of property values', function test( t ) {
	var expected;
	var actual;
	var d;

	d = [{'a':1,'b':0.5},{'a':2,'b':4},{'a':3,'b':12}];

	expected = [ [0,2], [1,0.5], [2,0.25] ];
	actual = pluck( d, 'a', 'b' );

	t.deepEqual( actual, expected, 'returns an array of tuples consisting of an index and a computed ratio' );
	t.end();
});
