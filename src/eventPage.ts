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
    if (request.popupMounted) {
        console.log('eventPage notified that Popup.tsx has mounted.');
    }

    if (request.loadOptions) loadOptions();    
});

0