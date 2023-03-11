window.addEventListener("online", function() {
  console.log("I am connected to the internet")
})
  
window.addEventListener("offline", function() {
  console.log("Disconnected...so sad!!!")
})

let allVideos = document.querySelectorAll('.video-container');
let allMuteIcon = document.querySelectorAll('.muteIcon');
let isMuted = true;
let target;

allVideos.forEach((video) => {

  video.addEventListener('mouseover', (e) => {
    // e.target.muted = true;
    e.target.play();
    e.target.controls = true;
  });
  video.addEventListener('mouseout', (e) => {
    console.log(target)
    e.target.pause();
    e.target.currentTime = 0;
    e.target.controls = false;
  });

  video.addEventListener('click', (e) => {
    if(e.target.classList.contains('muteIcon')){
        if(e.target.classList.contains('ri-volume-mute-fill')){
          e.target.classList.remove('ri-volume-mute-fill');
          e.target.classList.add('ri-volume-up-fill');
          e.target.parentNode.children[0].muted = false;
          isMuted = false;
        }else{
          e.target.classList.remove('ri-volume-up-fill');
          e.target.classList.add('ri-volume-mute-fill');
          e.target.parentNode.children[0].muted = true;
          isMuted = true;
        }
        console.log(e.target.parentNode.children[0])
    }
  })
});

let allVideosCtn = document.querySelector('.all-videos-ctn');
let totalVideos = allVideosCtn.childElementCount;

let setGapBetween = () => {
    let lastRowVideoCount = totalVideos % 4;

    if(allVideosCtn.childElementCount > 4 && (totalVideos % 4 !== 0)){
        let firstBox = allVideosCtn.children[0].offsetLeft + allVideosCtn.children[0].getBoundingClientRect().width;
        let secondBox = allVideosCtn.children[1].offsetLeft
        let gap = secondBox - firstBox;

        console.log(lastRowVideoCount)
        let lastElem = allVideosCtn.children[totalVideos - 1];
        let SecondlastElem = allVideosCtn.children[totalVideos - 2];
        let ThirdlastElem = allVideosCtn.children[totalVideos - 3];

        console.log(lastElem, SecondlastElem, ThirdlastElem)

        // lastElem && lastElem.style.marginRight = `${gap}px`;
        // SecondlastElem && SecondlastElem.style.marginRight = `${gap}px`;
        // ThirdlastElem && ThirdlastElem.style.marginRight = `${gap}px`;

        console.log(gap);
        // allVideosCtn.style.setProperty("--spaceBetween", `${gap}px`);
    }
}

window.addEventListener('resize', function(event) {
    // setGapBetween();
}, true);