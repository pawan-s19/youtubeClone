window.addEventListener("online", function () {
  console.log("I am connected to the internet");
});

window.addEventListener("offline", function () {
  console.log("Disconnected...so sad!!!");
});

let allVideos = document.querySelectorAll(".video-container");

allVideos.forEach((video) => {
  // video.addEventListener('mouseover', (e) => {
  //   // e.target.muted = true;
  //   console.log(e.target)
  //   e.target.play();
  //   e.target.controls = true;
  //   if(!isNaN(e.target.duration)){
  //     console.log('aa gaya',e.target.duration)
  //   }
  // });

  video.addEventListener("mouseout", (e) => {
    e.target.pause();
    e.target.currentTime = 0;
    e.target.controls = false;
  });
});

let allVideoWrapper = document.querySelectorAll(".video-wrapper");
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

allVideoWrapper.forEach((wrapper) => {
  wrapper.addEventListener("mouseover", function () {
    // target optionsMenu icon
    this.lastElementChild.lastElementChild.style.visibility = "initial";

    // target video to play and pause
    getVideoStream(
      this.firstElementChild.firstElementChild.firstElementChild.getAttribute(
        "data-bs-videoId"
      ),
      this.firstElementChild.firstElementChild.firstElementChild
    );
    this.firstElementChild.firstElementChild.firstElementChild.muted = true;
    this.firstElementChild.firstElementChild.firstElementChild.play();
    this.firstElementChild.firstElementChild.firstElementChild.controls = true;

    // target img to hide and show
    this.firstElementChild.firstElementChild.children[1].style.display = "none";
  });
  wrapper.addEventListener("mouseout", function () {
    if (!isOptionsBoxOpen) {
      this.lastElementChild.lastElementChild.style.visibility = "hidden";
    }
    // target img to hide and show
    this.firstElementChild.firstElementChild.children[1].style.display =
      "initial";

    // target video to play and pause
    getVideoStream(
      null,
      this.firstElementChild.firstElementChild.firstElementChild
    );
    this.firstElementChild.firstElementChild.firstElementChild.pause();
    this.firstElementChild.firstElementChild.firstElementChild.currentTime = 0;
    this.firstElementChild.firstElementChild.firstElementChild.controls = false;
  });
});

let allVideosCtn = document.querySelector(".all-videos-ctn");
let totalVideos = allVideosCtn.childElementCount;

let setGapBetween = () => {
  let lastRowVideoCount = totalVideos % 4;

  if (allVideosCtn.childElementCount > 4 && totalVideos % 4 !== 0) {
    let firstBox =
      allVideosCtn.children[0].offsetLeft +
      allVideosCtn.children[0].getBoundingClientRect().width;
    let secondBox = allVideosCtn.children[1].offsetLeft;
    let gap = secondBox - firstBox;

    console.log(lastRowVideoCount);
    let lastElem = allVideosCtn.children[totalVideos - 1];
    let SecondlastElem = allVideosCtn.children[totalVideos - 2];
    let ThirdlastElem = allVideosCtn.children[totalVideos - 3];

    console.log(lastElem, SecondlastElem, ThirdlastElem);

    // lastElem && lastElem.style.marginRight = `${gap}px`;
    // SecondlastElem && SecondlastElem.style.marginRight = `${gap}px`;
    // ThirdlastElem && ThirdlastElem.style.marginRight = `${gap}px`;

    console.log(gap);
    // allVideosCtn.style.setProperty("--spaceBetween", `${gap}px`);
  }
};

window.addEventListener(
  "resize",
  function (event) {
    // setGapBetween();
  },
  true
);

async function getVideoStream(videoId, video) {
  if (videoId) {
    video.src = `/play/${videoId}`;
  }
}


let shareVideo = document.querySelectorAll('.shareVideo')
inputVideoId = document.querySelector('.inputVideoId')


shareVideo.forEach(function(elem){
  elem.addEventListener('click', function(e){
    console.log(e.target)
    let vid = e.target.getAttribute('data-bs-whatever')
    inputVideoId.value = `http://localhost:3000/watch/${vid}`
  })
})
