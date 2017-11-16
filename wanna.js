chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.url);

  if (tab.url.includes('instagram')) {
    if (tab.url.includes('/p/')) { // Photo
      chrome.tabs.executeScript({
        code: `document.querySelectorAll('article > div > div > div > div:nth-child(1) > img:nth-child(1)')[0].src;`
      }, getInstagram);
    } else {
      chrome.tabs.executeScript({ // History Photo
        code: `document.querySelectorAll('div.ReactModalPortal > div > div > div > div.inner.ril-inner > img')[0].src;`
      }, getInstagram);

      chrome.tabs.executeScript({ // History Video
        code: `document.querySelectorAll('div.ReactModalPortal > div > div > div > div.inner.ril-inner > div.image-current.ril-image-current > div > video')[0].src;`
      }, getInstagram);
    }
  } else {
    console.log('Nothing to download...');
  }
});

function getInstagram(arr) {
  var url = arr[0];
  try {
    chrome.downloads.download({
      url
    });
  } catch (e) {
    console.log(e);
  }
}
