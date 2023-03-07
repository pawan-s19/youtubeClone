let videoInput = document.querySelector(".video");

videoInput.addEventListener("change", (e) => {
  let reader = new FileReader();
  let file = e.target.files[0];
  reader.readAsArrayBuffer(file);

  reader.onload = function (e) {
    let buffer = e.target.result;
    console.log(buffer);
    // We have to convert the buffer to a blob:
    let videoBlob = new Blob([new Uint8Array(buffer)], { type: "video/mp4" });

    // The blob gives us a URL to the video file:
    let url = window.URL.createObjectURL(videoBlob);
    let video = document.querySelector(".video-tag");
    video.src = url;
  };
});
