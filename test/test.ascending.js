'use strict';

// MODULES //

var tape = require( 'tape' );
var ascending = require( './../lib/ascending.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof ascending, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a negative number if a[1]<b[1]', function test( t ) {
	var a = [ null, 1 ];
	var b = [ null, 2 ];
	t.ok( ascending( a, b ) < 0, 'less than 0' );
	t.end();
});

tape( 'the function returns a positive number if a[1]>b[1]', function test( t ) {
	var a = [ null, 2 ];
	var b = [ null, 1 ];
	t.ok( ascending( a, b ) > 0, 'greater than 0' );
	t.end();
});

tape( 'the function returns zero if a[1]==b[1]', function test( t ) {
	var a = [ null, 1 ];
	var b = [ null, 1 ];
	t.equal( ascending( a, b ), 0, 'equals 0' );
	t.end();
});
