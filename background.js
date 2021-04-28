let ENABLED = true;

chrome.tabs.onUpdated.addListener( (tabId, changeInfo) => {
    if (changeInfo.status === 'complete' && ENABLED) {
        chrome.tabs.get(tabId, tab_info => {
            if ( /^https:\/\/github/.test(tab_info.url) ) {
                chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("script activated"));
            }
        })
    }
});