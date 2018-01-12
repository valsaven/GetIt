chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.url); // TODO: Remove

  if (tab.url.includes('instagram')) {
    if (tab.url.includes('/p/')) { // Photo
      chrome.tabs.executeScript({
        code: `document.querySelector('article > div > div > div > div:nth-child(1) > img:nth-child(1)').src;`
      }, getFile);
    } else if (tab.url.includes('stories')) {
      chrome.tabs.executeScript({ // Stories Photo
        code: `document.querySelector('#react-root > section > div > div > section > div > div > div > div > img').src;`
      }, getFile);

      chrome.tabs.executeScript({ // Stories Video
        code: `document.querySelector('video > source').src;`
      }, getFile);
    }
  } if (tab.url.includes('z0r.de')) {
    console.log('z0r');
    chrome.tabs.executeScript({
      code: `document.querySelector('body > object').data;`
    }, getFile);
  } else {
    console.log('Nothing to download...');
  }
});

function getFile(arr) {
  var url = arr[0];
  if (!url) {
    return false;
  }

  try {
    chrome.downloads.download({
      url
    });
  } catch (e) {
    console.log('Error(getFile): ' + e);
  }
}
