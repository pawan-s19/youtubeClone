const playlistModal = document.getElementById('playlistModal')
playlistModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const recipient = button.getAttribute('data-bs-whatever')
  const modalTitle = playlistModal.querySelector('.modal-title')
  let allPlaylists = button.getAttribute('data-bs-createdPls')
  const userPlaylists = playlistModal.querySelector('.userPlaylists')
  const modalBodyInput = playlistModal.querySelector('.modal-body input')
  const playListForm = playlistModal.querySelector(".playListForm")
  const plsSubmitBtn = playlistModal.querySelector(".plsSubmitBtn")
  const watchlater = document.querySelector('#watchlater')

  watchlater.addEventListener('click' , function(e){
    window.location.href = `/addToWatchLater/${recipient}`
  })

  playListForm.addEventListener('submit',(e) => {
    e.preventDefault();
    if(modalBodyInput.value.length > 0){
      playListForm.action = `/createplaylist/${recipient}`
      playListForm.submit();
    }else{
      alert('please give a valid name')
    }
  });

  document.querySelector('.playlistShowWrapper').addEventListener('click', function(e){
      console.log(e.target.getAttribute('data-bs-prefix'))
      e.preventDefault();
      window.location.href = e.target.getAttribute('data-bs-prefix') + recipient;
    })
})