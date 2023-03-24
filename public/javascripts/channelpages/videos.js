let allVideos = document.querySelectorAll(".video-container");

// allVideos.forEach((video) => {
//     video.addEventListener("mouseout", (e) => {
//         e.target.pause();
//         e.target.currentTime = 0;
//         e.target.controls = false;
//     });
// });

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

        // // target video to play and pause
        // getVideoStream(
        //     this.firstElementChild.firstElementChild.firstElementChild.getAttribute(
        //         "data-bs-videoId"
        //     ),
        //     this.firstElementChild.firstElementChild.firstElementChild
        // );
        // this.firstElementChild.firstElementChild.firstElementChild.muted = true;
        // this.firstElementChild.firstElementChild.firstElementChild.play();
        // this.firstElementChild.firstElementChild.firstElementChild.controls = true;

        // // target img to hide and show
        // this.firstElementChild.firstElementChild.children[1].style.display = "none";
    });
    wrapper.addEventListener("mouseout", function () {
        if (!isOptionsBoxOpen) {
            this.lastElementChild.lastElementChild.style.visibility = "hidden";
        }
        // // target img to hide and show
        // this.firstElementChild.firstElementChild.children[1].style.display =
        //     "initial";

        // // target video to play and pause
        // getVideoStream(
        //     null,
        //     this.firstElementChild.firstElementChild.firstElementChild
        // );
        // this.firstElementChild.firstElementChild.firstElementChild.pause();
        // this.firstElementChild.firstElementChild.firstElementChild.currentTime = 0;
        // this.firstElementChild.firstElementChild.firstElementChild.controls = false;
    });
});

async function getVideoStream(videoId, video) {
    if (videoId) {
        video.src = `/play/${videoId}`;
    }
}
