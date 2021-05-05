( () => {
    chrome.storage.sync.get(['enabled'], ({enabled}) => {
        if (enabled) {
            const observer = new MutationObserver((mutations, observer) => {
                openRichDiffView();
                setTimeout(() => {
                    observer.disconnect();
                }, 2000); 
                
            })
            observer.observe(document.body, {childList: true, subtree: true });

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