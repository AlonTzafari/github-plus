let ENABLED : boolean;

function loadOptions () : void {
    chrome.storage.sync.get(['enabled'], ({enabled}) => {
        console.log('enabled: ', enabled);
        if (typeof enabled === 'undefined') {
            chrome.storage.sync.set({'enabled': true});
            ENABLED = true;
            return;
        } 
        ENABLED = enabled;
    })
}
loadOptions();

chrome.storage.onChanged.addListener( () => loadOptions() );

const filesPageListener = (tabId, changeInfo, tab) => {
    if ( changeInfo.url != null && /https:\/\/github\.com\/.+\/.+\/pull\/.+\/files/.test(tab.url) ) {
        chrome.tabs.sendMessage(tabId, {command: 'openDiff'});
        chrome.tabs.onUpdated.removeListener(filesPageListener);
    }
}

chrome.webNavigation.onCompleted.addListener(details => {
    if ( /https:\/\/github\.com\/.+\/.+\/pull\/.+/.test(details.url) ) {
        chrome.tabs.onUpdated.addListener(filesPageListener)
    } 
})

