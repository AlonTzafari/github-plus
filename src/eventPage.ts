let AUTO_RICH_DIFF : boolean;

function loadOptions () : void {
    chrome.storage.sync.get(['autoRichDiff'], ({autoRichDiff}) => {
        console.log('autoRichDiff: ', autoRichDiff);
        if (typeof autoRichDiff === 'undefined') {
            chrome.storage.sync.set({'autoRichDiff': true});
            AUTO_RICH_DIFF = true;
            return;
        } 
        AUTO_RICH_DIFF = autoRichDiff;
    })
}
loadOptions();

chrome.storage.onChanged.addListener( () => loadOptions() );

const tabsProcessed = [];

const filesPageListener = (tabId, changeInfo, tab) => {
    if ( changeInfo.url != null && /https:\/\/github\.com\/.+\/.+\/pull\/.+\/files/.test(tab.url) && tabsProcessed.indexOf(tabId) === -1) {
        chrome.tabs.sendMessage(tabId, {command: 'openDiff'});
        tabsProcessed.push(tabId);
    } else if ( changeInfo.url != null && !/https:\/\/github\.com\/.+\/.+\/pull\/.+\/files/.test(tab.url) && tabsProcessed.indexOf(tabId) !== -1 ) {
        const index = tabsProcessed.indexOf(tabId);
        tabsProcessed.splice(index, 1);
    }
}

chrome.webNavigation.onCompleted.addListener(details => {
    if ( /https:\/\/github\.com\/.+\/.+\/pull\/.+/.test(details.url) ) {
        chrome.tabs.onUpdated.addListener(filesPageListener)
    } 
})

