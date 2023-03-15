// let vidCtn = document.querySelector('.videoContainer');
// let video = document.querySelector('.videoContainer video');
// let vidCtnPoster = document.querySelector('.videoContainer img');

// vidCtn.addEventListener('mouseover', () => {
//     vidCtnPoster.style.display = 'none'
//     video.muted = true;
//     video.play();
// });


// vidCtn.addEventListener('mouseout', () => {
//     vidCtnPoster.style.display = 'initial'
//     video.currentTime = 0;
//     video.pause();
// });

let descriptionBox = document.querySelector('.description');
let descriptionText = document.querySelector('.desText');
let showMore = document.querySelector('.showMore');

let isShowMore = false;
descriptionBox.addEventListener('click', (e) => {
    if (isShowMore) {
        descriptionText.classList.remove('desShrink');
        showMore.textContent = "Show More";
        isShowMore = false;
        console.log(isShowMore)
    } else {
        descriptionText.classList.add('desShrink');
        showMore.textContent = "Show Less";
        // descriptionBox.style.lineClamp = '0'
        isShowMore = true;
        console.log(isShowMore)
    }
})

let allVideosSec = document.querySelectorAll('.videoAndTextWrapper')
let optionsMenu = document.querySelector('.optionsMenu');

let isOptionsBoxOpen = false;

optionsMenu.addEventListener('show.bs.dropdown', event => {
    isOptionsBoxOpen = true;
})

optionsMenu.addEventListener('hide.bs.dropdown', event => {
    isOptionsBoxOpen = false;
    optionsMenu.style.visibility = 'hidden'
})

allVideosSec.forEach((wrapper) => {
    wrapper.addEventListener('mouseover', function () {
        this.lastElementChild.style.visibility = 'initial'
    });
    wrapper.addEventListener('mouseout', function () {
        if(!isOptionsBoxOpen){
            this.lastElementChild.style.visibility = 'hidden'
        }
    });
});




// document.querySelector('.videoAndTextWrapper').addEventListener('mouseover', () => {
//     document.querySelector('.optionsMenu').style.visibility = 'initial'
// });

// descriptionBox.addEventListener('click', () => {
//     descriptionText.classList.add('desShrink');
//     descriptionBox.style.setProperty('--displayNot', "none");
//     showMore.textContent = "Show Less";
// });

// showMore.addEventListener('click', () => {
//     descriptionText.classList.remove('desShrink');
//     showMore.textContent = "Show More";
//     descriptionBox.style.setProperty('--displayNot', "block");
//     console.log('first')
// });