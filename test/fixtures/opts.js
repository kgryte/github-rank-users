'use strict';

function getOpts() {
	var opts = {
		'token': 'abcdef123!',
		'useragent': 'beep-boop-bop',
		'method': 'followers',
		'order': 'desc'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
