let allVideosSec = document.querySelectorAll(".videoAndTextWrapper");
let optionsMenu = document.querySelectorAll(".optionsMenu");

let isOptionsBoxOpen = false;

optionsMenu.forEach((e) => {
  e.addEventListener("show.bs.dropdown", (event) => {
    isOptionsBoxOpen = true;
  });

  e.addEventListener("hide.bs.dropdown", (event) => {
    isOptionsBoxOpen = false;

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
      if (this.hasAttribute("videoId")) {
        let id = this.getAttribute("videoId");
        window.location = `/watch/${id}`;
      } else if (this.hasAttribute("channelId")) {
        let channelId = this.getAttribute("channelId");
        window.location = `/channel/${channelId}/home`;
      }
    }
    if (e.target.classList.contains("share-channel")) {
      console.log(e.target.childNodes);
      let shareChannelId = e.target.getAttribute("shareChannelId");
      navigator.clipboard.writeText(
        `http://localhost:3000/channel/${shareChannelId}/home`
      );
    }
  });
});
