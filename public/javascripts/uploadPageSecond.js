let url;
let thumbNailInput = document.querySelector(".thumbnail");
let video = document.querySelector(".video-tag");

thumbNailInput.addEventListener("change", (e) => {
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.readAsDataURL(file);

  reader.onload = function (e) {
    video.poster = e.target.result;
  };
});
