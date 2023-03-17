(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

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
