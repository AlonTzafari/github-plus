function addDifferenceBtn() : void {
    const imageViewModesList = document.querySelectorAll('ul.js-view-modes.render-view-modes');
    if (imageViewModesList.length >= 1) {
        const viewModesArray = Array.from(imageViewModesList);
        viewModesArray.forEach(viewModes => {
            const differenceBtn = document.createElement('li');
            differenceBtn.innerText = 'difference';
            viewModes.appendChild(differenceBtn);
        });
    }
}

function differenceClickHandler(event : MouseEvent) : void {
}

(() => {
    addDifferenceBtn()
})()