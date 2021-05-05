
import resemblejs from 'resemblejs';

(() => {
    let isActionExecuted = false;
    const imgs = Array.from(document.images);
    imgs.forEach(img => {
        if (img.complete) {
            if ( imgs.every(img => img.src.length > 0) && !isActionExecuted) {
                console.log('adding btn');
                addDifferenceBtn();
                isActionExecuted = true;
            }
        } 
        img.addEventListener('load', ()=> {
            if ( imgs.every(img => img.src.length > 0)  && !isActionExecuted) {
                console.log('adding btn');
                addDifferenceBtn();
                isActionExecuted = true;
            }
            
        }, false);
    })

    function addDifferenceBtn() : any {
        const imageViewModesList = document.querySelectorAll('ul.js-view-modes.render-view-modes');
        if (imageViewModesList.length < 1) return; 
        const viewModesArray = Array.from(imageViewModesList);
        viewModesArray.forEach(viewModes => {
            const differenceBtn = document.createElement('li');
            differenceBtn.innerText = 'Difference';
            viewModes.appendChild(differenceBtn);
        
            //add image element
            const modesBar = viewModes.parentNode;
            const viewContainer = modesBar.parentNode;
            const diffContainer = document.createElement('div');
            const diffImg = document.createElement('img');
            diffContainer.classList.add('diff-container');
            diffImg.classList.add('difference');
            diffContainer.appendChild(diffImg);
            let isActive = false;
            differenceBtn.addEventListener('click', () => { 
                isActive = !isActive;
                isActive ? 
                viewContainer.insertBefore(diffContainer, modesBar) :
                diffContainer.remove();
            })
            

            //get images src
            const prevImgElem : HTMLImageElement = viewContainer.querySelector('img.deleted');
            const newImgElem : HTMLImageElement = viewContainer.querySelector('img.added');
            const prevImgSrc = prevImgElem.src;
            const newImgSrc = newImgElem.src;
            resemblejs.outputSettings({
                errorColor: {
                    red: 200,
                    green: 0,
                    blue: 0
                }
            });
            if(newImgSrc !== '' && prevImgSrc !== '') {
                resemblejs(newImgSrc).compareTo(prevImgSrc).onComplete(data => {
                    diffImg.src = data.getImageDataUrl();
                })
            }
            
        });
    }


})()