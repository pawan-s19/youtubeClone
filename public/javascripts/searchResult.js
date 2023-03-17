
let allVideosSec = document.querySelectorAll('.videoAndTextWrapper')
let optionsMenu = document.querySelectorAll('.optionsMenu');

let isOptionsBoxOpen = false;

optionsMenu.forEach((e) => {
  e.addEventListener('show.bs.dropdown', event => {
      isOptionsBoxOpen = true;
  })
  
  e.addEventListener('hide.bs.dropdown', event => {
      isOptionsBoxOpen = false;
      console.log(e)
      e.style.visibility = 'hidden'
  })
})

allVideosSec.forEach((wrapper) => {
    wrapper.addEventListener('mouseover', function () {
        this.lastElementChild.style.visibility = 'initial'
        wrapper.style.cursor = 'pointer'
    });
    wrapper.addEventListener('mouseout', function () {
        if(!isOptionsBoxOpen){
            this.lastElementChild.style.visibility = 'hidden'
        }
    });
});

