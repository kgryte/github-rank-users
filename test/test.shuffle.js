'use strict';

// MODULES //

var tape = require( 'tape' );
var shuffle = require( './../lib/shuffle.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof shuffle, 'function', 'main export is a function' );
	t.end();
});

tape( 'function returns a shuffled array based on a provided sort vector', function test( t ) {
	var expected;
	var actual;
	var sorted;
	var d;

	d = [{'a':1},{'a':2},{'a':3}];
	sorted = [[1,null],[0,null],[2,null]];

	expected = [{'a':2},{'a':1},{'a':3}];
	actual = shuffle( d, sorted );

	t.deepEqual( actual, expected, 'returns a shuffled array' );
	t.end();
});
