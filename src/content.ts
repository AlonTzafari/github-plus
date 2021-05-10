( () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        chrome.storage.sync.get(['autoRichDiff'], ({autoRichDiff}) => {
            if (message.command === 'openDiff' && autoRichDiff) {
                const observer = new MutationObserver((mutations, observer) => {
                    const nBtns = document.querySelectorAll('button[aria-label="Display the rich diff"]').length;
                    if (nBtns > 0) {
                        openRichDiffView();
                        observer.disconnect();
                        const response = nBtns === 0 ? {err: 'no buttons'} : {numOfButtons: nBtns};
                        sendResponse(response);
                    }
                    
                })
                observer.observe(document.body, {childList: true, subtree: true });

            }
        })
    })

    function openRichDiffView() : void {
        const richDiffButtons = document.querySelectorAll('button[aria-label="Display the rich diff"]');
        if (richDiffButtons.length >= 1) {
            const btnArray = Array.from(richDiffButtons);
            btnArray.forEach(button => {
                button['click']();
            });
        }
    }

})()