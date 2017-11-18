chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.url);

  if (tab.url.includes('instagram')) {
    if (tab.url.includes('/p/')) { // Photo
      chrome.tabs.executeScript({
        code: `document.querySelectorAll('article > div > div > div > div:nth-child(1) > img:nth-child(1)')[0].src;`
      }, getInstagram);
    } else if (tab.url.includes('stories')) {
      chrome.tabs.executeScript({ // Stories Photo
        code: `document.querySelectorAll('#react-root > section > div > div > section > div > div > div > div > img')[0].src;`
      }, getInstagram);

      chrome.tabs.executeScript({ // Stories Video
        code: `document.querySelectorAll('video > source')[0].src;`
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
