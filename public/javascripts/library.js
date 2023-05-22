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
  });
  wrapper.addEventListener("mouseout", function () {
    if (!isOptionsBoxOpen) {
      this.lastElementChild.lastElementChild.style.visibility = "hidden";
    }
  });
});
