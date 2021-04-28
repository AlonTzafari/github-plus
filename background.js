console.log("from background");

// chrome.tabs.onActivated.addListener(tab => {
//     console.log(tab);
//     chrome.tabs.get(tab.tabId, tab_info => {
//         console.log(tab_info);
//         if ( /^https:\/\/github/.test(tab_info.url) ) {
//             chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("script injected"));
//         }
//     });
// });

// chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
//     console.log(request);
//     if (request.type === "opened rich diff") {
//         typingHistory.push(request.content);
//         sendResponse({ok: true});
//     }
// });

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.tabs.get(tabId, tab_info => {
            if ( /^https:\/\/github/.test(tab_info.url) ) {
                chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("script activated"));
            }
        })
    }
});