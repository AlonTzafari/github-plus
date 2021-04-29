document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('#enable');
    chrome.runtime.sendMessage( {type: 'getEnabled'}, (response) => {
        toggleBtn.checked = response.enabled;    
    })
    toggleBtn.addEventListener('click', event => {
        if (event.target.id !== 'enable') return;
        const payload = {
            type: 'setEnabled',
            enabled: event.target.checked
        };
        chrome.runtime.sendMessage(payload);
    });
});




