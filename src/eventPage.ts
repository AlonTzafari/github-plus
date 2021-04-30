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

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.loadOptions) loadOptions();    

});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('tabId: ', tabId);
    console.log('changeInfo: ', changeInfo);
    console.log('tab: ', tab);
    
})

chrome.tabs.onUpdated.addListener( (tabId, changeInfo) => {
    if (changeInfo.status === 'complete' && ENABLED) {
        chrome.tabs.get(tabId, tab_info => {
            if ( /^https:\/\/github/.test(tab_info.url) ) {
                chrome.tabs.executeScript(tab_info.id, {file: './js/content.js'}, () => console.log(chrome.runtime.lastError, "script activated"));
            }
        })
    }
});