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

var copyLinkButton2 = document.querySelector('.copyLinkButton2')


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
    if (!e.target.classList.contains("ri-more-2-line") && !e.target.classList.contains('notOpen')) {
      let id = this.getAttribute("videoId");
      window.location = `/watch/${id}`;
    }
  });
});

copyLinkButton2.addEventListener("click", async (e) => {
    await navigator.clipboard.writeText(window.location.href);
    console.log(window.location.href)
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

let shareVideo = document.querySelectorAll('.shareVideo')
inputVideoId = document.querySelector('.inputVideoId')


shareVideo.forEach(function(elem){
  elem.addEventListener('click', function(e){
    console.log(e.target)
    let vid = e.target.getAttribute('data-bs-whatever')
    inputVideoId.value = `http://localhost:3000/watch/${vid}`
  })
})