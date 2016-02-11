'use strict';

// MODULES //

var tape = require( 'tape' );
var pluck = require( './../lib/pluck.raw.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof pluck, 'function', 'main export is a function' );
	t.end();
});

tape( 'function returns an array of tuples consisting of an element index and a property value', function test( t ) {
	var expected;
	var actual;
	var d;

	d = [{'a':1,'b':0.5},{'a':2,'b':4},{'a':3,'b':12}];

	expected = [ [0,0.5], [1,4], [2,12] ];
	actual = pluck( d, 'b' );

	t.deepEqual( actual, expected, 'returns an array of tuples consisting of an index and a property value' );
	t.end();
});
