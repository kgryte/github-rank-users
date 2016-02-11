Rank Users
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Rank users.


## Installation

``` bash
$ npm install github-rank-users
```


## Usage

``` javascript
var rank = require( 'github-rank-users' );
```

<a name="rank"></a>
#### rank( data[, opts], clbk )

Ranks users provided a [user detail][github-user-details] input data `array`.

``` javascript
var data = [
	{
		'login': 'beep',
		'followers': 9,
		// ...user details
	},
	{
		'login': 'boop',
		'followers': 10,
		// ...user details
	}
];

var opts = {
	'method': 'followers'
};

rank( data, opts, clbk );

function clbk( error, results, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( results ) );
	/*
		{
			"data": [
				{"login":"boop",...},
				{"login":"beep",...},
				...
			],
			"results": [ 10, 9 ]
		}
	*/
}
```

The returned `results` is comprised as follows:
*	__data__: ranked [user detail][github-user-details] data.
*	__results__: corresponding computed scores used to rank users.

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token].
*	__useragent__: [user agent][github-user-agent] `string`.
*	__method__: analysis method. Default: `'followers'`.
	-	__followers__: rank based on `follower` count.
	-	__following__: rank based on `following` count.
	-	__repos__: rank based on number of public repositories.
	-	__gists__: rank based on number of public gists.
	-	__created__: rank based on when a user created a Github account.
	-	__ffratio__: rank based on the ratio of `follower`-to-`following`. 

During analysis, the module may need to request resources from the Github [API][github-api]. To permit Github [authentication][github-oauth2], set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

rank( data, opts, clbk );
```

To specify a [user agent][github-user-agent] when interacting with the Github [API][github-api], set the `useragent` option.

``` javascript
var opts = {
	'useragent': 'hello-github!'
};

rank( data, opts, clbk );
```

To specify an analysis method, set the `method` option.

``` javascript
var opts = {
	'method': 'ffratio'
};

rank( data, opts, clbk );
```


#### rank.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'method': 'following',
	'token': 'tkjorjk34ek3nj4!'
};

var run = rank.factory( opts, clbk );

run( data );
run( data );
run( data );
// ...
```

The factory method accepts the same `options` as [`rank()`](#rank).


## Notes

*	If an analysis method requires interacting with the Github [API][github-api], [rate limit][github-rate-limit] information is returned to the provided callback.
*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript
var rank = require( 'github-rank-users' );
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-rank-users
```


### Usage

``` bash
Usage: ghrankusers [options] user1 user2 ...

Options:

  -h,  --help                 Print this message.
  -V,  --version              Print the package version.
       --token token          Github access token.
  -ua, --useragent ua         User agent.
       --method method        Rank method. Default: followers.
       --format format        Output format: csv or json. Default: csv.
       --delimiter delimiter  CSV column delimiter. Default: ','.
```


### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	Analysis results are written to `stdout`.
	-	If the output format is [`csv`][csv], only the `username` and associated score used to rank a user are written to `stdout`.
	-	If the output format is [`json`][json], results written to `stdout` include both raw [user detail][github-user-details] data and associated scores.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghrankusers --token <token> user1 user2 user3
# => username,value
# => user1,869
# => user2,637
# => user3,544
# => ...
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghrankusers user1 user2 user3
# => username,value
# => user1,869
# => user2,637
# => user3,544
# => ...
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghrankusers user1 user2 user3
# => username,value
# => user1,869
# => user2,637
# => user3,544
# => ...
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> user1 user2 user3
# => username,value
# => user1,869
# => user2,637
# => user3,544
# => ...
```

To output as [JSON][json], set the `format` option.

``` bash
$ DEBUG=* ghrankusers --token <token> user1 user2 user3 --format json
# => '{"data":[{...},{...},...],"results":[...]}'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-rank-users.svg
[npm-url]: https://npmjs.org/package/github-rank-users

[build-image]: http://img.shields.io/travis/kgryte/github-rank-users/master.svg
[build-url]: https://travis-ci.org/kgryte/github-rank-users

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-rank-users/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-rank-users?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-rank-users.svg
[dependencies-url]: https://david-dm.org/kgryte/github-rank-users

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-rank-users.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-rank-users

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-rank-users.svg
[github-issues-url]: https://github.com/kgryte/github-rank-users/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time
[csv]: https://en.wikipedia.org/wiki/Comma-separated_values
[json]: http://www.json.org/

[github-user-details]: https://github.com/kgryte/github-user-details
[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/