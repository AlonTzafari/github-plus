function openRichDiffView() : boolean | undefined {
    const richDiffButtons = document.querySelectorAll('button[aria-label="Display the rich diff"]');
    if (richDiffButtons.length >= 1) {
        const btnArray = Array.from(richDiffButtons);
        btnArray.forEach(button => {
            button['click']();
        });
        return true;
    }
}



(() => {
    chrome.storage.sync.get('enabled', (items) => {
        if (items.enabled) openRichDiffView();    
    })
})()