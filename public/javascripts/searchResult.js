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
    this.lastElementChild.lastElementChild.style.visibility = "initial";
    wrapper.style.cursor = "pointer";
  });
  wrapper.addEventListener("mouseout", function () {
    if (!isOptionsBoxOpen) {
      this.lastElementChild.lastElementChild.style.visibility = "hidden";
    }
  });
  wrapper.addEventListener("click", function (e) {
    if (!e.target.classList.contains("ri-more-2-line")) {
      console.log(this.hasAttribute("channelId"));

      if (this.hasAttribute("videoId")) {
        let id = this.getAttribute("videoId");
        window.location = `/watch/${id}`;
      } else if (this.hasAttribute("channelId")) {
        let channelId = this.getAttribute("channelId");
        window.location = `/channel/${channelId}/home`;
      }
    }
  });
});
