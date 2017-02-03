chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: chrome.extension.getURL('src/app/index.html')});
});
