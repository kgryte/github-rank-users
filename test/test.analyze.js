'use strict';

// MODULES //

var tape = require( 'tape' );
var copy = require( 'utils-copy' );
var analyze = require( './../lib/analyze.js' );


// FIXTURES //

var options = require( './fixtures/opts.js' );
var data = require( './fixtures/data.json' );


// FUNCTIONS //

function setup() {
	return copy( data );
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof analyze, 'function', 'main export is a function' );
	t.end();
});

tape( 'function supports ranking users based on follower counts', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'followers';

	expected = [ data[0], data[1] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on follower counts' );
		t.end();
	}
});

tape( 'function supports ranking users based on following counts', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'following';

	expected = [ data[1], data[0] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on following counts' );
		t.end();
	}
});

tape( 'function supports ranking users based on number of repo counts', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'repos';

	expected = [ data[0], data[1] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on repo counts' );
		t.end();
	}
});

tape( 'function supports ranking users based on gist counts', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'gists';

	expected = [ data[1], data[0] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on gist counts' );
		t.end();
	}
});

tape( 'function supports ranking users based on when a user created an account (descending)', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'created';
	opts.order = 'desc';

	expected = [ data[0], data[1] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on when a user created an account' );
		t.end();
	}
});

tape( 'function supports ranking users based on when a user created an account (ascending)', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'created';
	opts.order = 'asc';

	expected = [ data[1], data[0] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on when a user created an account' );
		t.end();
	}
});

tape( 'function supports ranking users based on the ratio of followers to following', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'ffratio';

	expected = [ data[0], data[1] ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.data, expected, 'ranks users based on follower-to-following ratio' );
		t.end();
	}
});

tape( 'function returns the results used to rank users', function test( t ) {
	var expected;
	var opts;

	opts = options();
	opts.method = 'followers';

	expected = [ data[0].followers, data[1].followers ];
	analyze( setup(), opts, done );

	function done( error, actual ) {
		t.deepEqual( actual.results, expected, 'returns scores' );
		t.end();
	}
});
