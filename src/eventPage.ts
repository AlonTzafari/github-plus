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


// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.from === 'iframe') console.log(request);
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    
    if( 
        changeInfo.status === 'complete' && /:\/\/.github.com/.test(tab.url) ) {
        chrome.tabs.executeScript({file: './content'});
    }
})

chrome.webNavigation.onHistoryStateUpdated.addListener(()=>{
    chrome.runtime.sendMessage({script: 'iframe'});
    console.log('navigation event');
})


// {
//     "matches": ["https://*.github.com/*"],
//     "js": ["./js/content.js"]
// },