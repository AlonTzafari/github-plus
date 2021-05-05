( () => {
    chrome.storage.sync.get(['enabled'], ({enabled}) => {
        if (enabled) {
            const observer = new MutationObserver(openRichDiffView);
            observer.observe(document.body, { attributes: true, childList: true, subtree: true });
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
    
})()