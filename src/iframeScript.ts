
import resemblejs from 'resemblejs';

(() => {
    
    onImagesLoad(addDifferenceBtn);


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
            const diffImg = document.createElement('img');
            diffImg.classList.add('difference');
            diffImg.hidden = true;
            differenceBtn.addEventListener('click', () => { diffImg.hidden = !diffImg.hidden;})
            viewContainer.insertBefore(diffImg, modesBar);

            //get images src
            const prevImgElem : HTMLImageElement = viewContainer.querySelector('img.deleted');
            const newImgElem : HTMLImageElement = viewContainer.querySelector('img.added');
            const prevImgSrc = prevImgElem.src;
            const newImgSrc = newImgElem.src;
            resemblejs(newImgSrc).compareTo(prevImgSrc).onComplete(data => {
                diffImg.src = data.getImageDataUrl();
            })  
            
        });

       
    }

   
    function onImagesLoad (callback) {
        const imgs = document.images,
        len = imgs.length;
        let counter = 0;

        [].forEach.call( imgs, function( img ) {
            if(img.complete)
                incrementCounter();
            else
                img.addEventListener( 'load', incrementCounter, false );
        } );

        function incrementCounter() {
            counter++;
            if ( counter === len ) {
                callback();
            }
        }
    }



})()