'use strict';

// MODULES //

var tape = require( 'tape' );
var sort = require( './../lib/sort.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof sort, 'function', 'main export is a function' );
	t.end();
});

tape( 'function supports sorting tuple data in descending order', function test( t ) {
	var expected;
	var actual;
	var d;

	d = [[0,2],[1,0],[2,3]];

	expected = [[2,3],[0,2],[1,0]];
	actual = sort( d, 'desc' );

	t.deepEqual( actual, expected, 'sorts in descending order' );
	t.end();
});

tape( 'function supports sorting tuple data in ascending order', function test( t ) {
	var expected;
	var actual;
	var d;

	d = [[0,2],[1,0],[2,3]];

	expected = [[1,0],[0,2],[2,3]];
	actual = sort( d, 'asc' );

	t.deepEqual( actual, expected, 'sorts in ascending order' );
	t.end();
});
