console.log('from foreground');
 
(() => {
    const richDiffButtons = document.querySelectorAll('button[aria-label="Display the rich diff"]');
    if (richDiffButtons.length >= 1) {
        const btnArray = Array.from(richDiffButtons);
        console.log(btnArray);
        btnArray.forEach(button => {
            button.click();
        });
    }
})()

