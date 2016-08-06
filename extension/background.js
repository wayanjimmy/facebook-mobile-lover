chrome.webRequest.onBeforeRequest.addListener(details => {
  if (details.method !== 'GET') {
    return;
  }

  const url = new URL(details.url);

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
