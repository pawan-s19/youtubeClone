window.addEventListener("online", function() {
  console.log("I am connected to the internet")
})
  
window.addEventListener("offline", function() {
  console.log("Disconnected...so sad!!!")
})

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

// console.log(allVideosCtn.childElementCount)
// console.log(allVideosCtn.children)
// console.log(allVideosCtn.childNodes)

// setGapBetween();

window.addEventListener('resize', function(event) {
    // setGapBetween();
}, true);