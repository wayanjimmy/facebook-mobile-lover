'use strict';

const blacklist = [
	/(share|intent|oauth)/,
	/^i\/redirect\?url=/
];

chrome.webRequest.onBeforeRequest.addListener(details => {
	if (details.method !== 'GET') {
		return;
	}

	const url = new URL(details.url);
	const pathAndQuery = url.pathname.slice(1) + url.search;

	if (blacklist.some(x => x.test(pathAndQuery))) {
		return;
	}

	url.hostname = 'm.facebook.com';

	return {
		redirectUrl: url.href
	};
}, {
	urls: [
		'https://www.facebook.com/*'
	],
	types: [
		'main_frame'
	]
}, [
	'blocking'
]);
