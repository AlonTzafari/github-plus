console.log('script loaded');

// document.addEventListener('load', openRichDiffView);
( () => {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('message');
    if(message.event === 'update') {
        console.log('update');
        
        // chrome.storage.sync.get('enabled', (items) => {
        //     console.log(items.enabled);
            
        //     if (items.enabled) openRichDiffView(); 
        // });
    }
});


function openRichDiffView() : void {
    const richDiffButtons = document.querySelectorAll('button[aria-label="Display the rich diff"]');
    if (richDiffButtons.length >= 1) {
        const btnArray = Array.from(richDiffButtons);
        btnArray.forEach(button => {
            button['click']();
        });
    }
}
openRichDiffView();
})()