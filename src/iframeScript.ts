
import resemblejs from 'resemblejs';

(() => {
    let counter = 0;
    const imgs = Array.from(document.images);
    console.log('imgs length: ',imgs);
    
    imgs.forEach(img => {
        if (img.complete) ++counter;
        img.addEventListener('load', ()=> {
            console.log(img.className, img.complete, ++counter, img.src);
            if (counter === imgs.length) addDifferenceBtn();
            
        }, false);
    })
    // console.log('iframe', Array.from(document.images).map(img => `${img.className} src: ${img.src}` ));
    
    chrome.runtime.onMessage.addListener((message) => {
        console.log('iframe received message');
        
        if(message.script === 'iframe') onImagesLoad(addDifferenceBtn);
    });

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

   
    async function onImagesLoad (callback) {
        
        const imgs = Array.from(document.images);
        console.log(imgs);
        
        let counter = 0;

        imgs.forEach( img => {
            if(img.complete)
                incrementCounter();
            else
                img.addEventListener( 'load', incrementCounter);
        } );

        function incrementCounter() {
            counter++;
            if ( counter === imgs.length ) {
                 callback();
            }
        }
    }



})()