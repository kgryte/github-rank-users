'use strict';

// MODULES //

var tape = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var copy = require( 'utils-copy' );
var rank = require( './../lib/rank.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/data.json' );
var results = require( './fixtures/results.json' );
var info = require( './fixtures/info.json' );


// FUNCTIONS //

function setup() {
	return copy( data );
}


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof rank, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when running analysis', function test( t ) {
	var opts;
	var rank;

	rank = proxyquire( './../lib/rank.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	rank( setup(), opts, done );

	function factory( opts, clbk ) {
		return function rank() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk({
					'status': 404,
					'message': 'beep'
				});
			}
		};
	}

	function done( error ) {
		t.equal( error.status, 404, 'equal status' );
		t.equal( error.message, 'beep', 'equal message' );
		t.end();
	}
});

tape( 'function returns analysis results to a provided callback', function test( t ) {
	var expected;
	var opts;
	var rank;

	rank = proxyquire( './../lib/rank.js', {
		'./factory.js': factory
	});

	expected = results;

	opts = getOpts();
	rank( setup(), opts, done );

	function factory( opts, clbk ) {
		return function rank() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var opts;
	var rank;

	rank = proxyquire( './../lib/rank.js', {
		'./factory.js': factory
	});

	expected = info;

	opts = getOpts();
	rank( setup(), opts, done );

	function factory( opts, clbk ) {
		return function rank() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results, info );
			}
		};
	}

	function done( error, data, info ) {
		assert.deepEqual( info, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function options are optional', function test( t ) {
	var expected;
	var rank;

	rank = proxyquire( './../lib/rank.js', {
		'./factory.js': factory
	});

	expected = results;

	rank( setup(), done );

	function factory( opts, clbk ) {
		return function rank() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results, info );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
