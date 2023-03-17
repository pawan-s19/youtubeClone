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

let descriptionBox = document.querySelector(".description");
let descriptionText = document.querySelector(".desText");
let showMore = document.querySelector(".showMore");

let editcomment = document.querySelectorAll('.comment-edit');
let commentform = document.querySelector('.comment-form');

// console.log(dropdownmenu)

editcomment.forEach(function(e){
    console.log(e)
    e.addEventListener("click",function(elem){
        this.parentNode.children[1].children[0].style.display = 'block'
    })
})

// editcomment.addEventListener('click' , function(e){
//     commentform.style.display = 'block'
//     // dropdownmenu.show()  
// })



let isShowMore = false;
descriptionBox.addEventListener("click", (e) => {
  if (isShowMore) {
    descriptionText.classList.remove("desShrink");
    showMore.textContent = "Show More";
    isShowMore = false;
    console.log(isShowMore);
  } else {
    descriptionText.classList.add("desShrink");
    showMore.textContent = "Show Less";
    // descriptionBox.style.lineClamp = '0'
    isShowMore = true;
    console.log(isShowMore);
  }
});

let allVideosSec = document.querySelectorAll(".videoAndTextWrapper");
let optionsMenu = document.querySelectorAll(".optionsMenu");

let isOptionsBoxOpen = false;

optionsMenu.forEach((e) => {
  e.addEventListener("show.bs.dropdown", (event) => {
    isOptionsBoxOpen = true;
  });

  e.addEventListener("hide.bs.dropdown", (event) => {
    isOptionsBoxOpen = false;
    console.log(e);
    e.style.visibility = "hidden";
  });
});

allVideosSec.forEach((wrapper) => {
  wrapper.addEventListener("mouseover", function () {
    this.lastElementChild.style.visibility = "initial";
  });
  wrapper.addEventListener("mouseout", function () {
    if (!isOptionsBoxOpen) {
      this.lastElementChild.style.visibility = "hidden";
    }
  });
  wrapper.addEventListener("click", function (e) {
    if (!e.target.classList.contains("ri-more-2-line")) {
      let id = this.getAttribute("videoId");
      window.location = `/watch/${id}`;
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
