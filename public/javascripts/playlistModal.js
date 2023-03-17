const playlistModal = document.getElementById('playlistModal')
playlistModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const recipient = button.getAttribute('data-bs-whatever')
  const modalTitle = playlistModal.querySelector('.modal-title')
  const allPlaylists = button.getAttribute('data-bs-createdPls')
  const userPlaylists = playlistModal.querySelector('.userPlaylists')
  const modalBodyInput = playlistModal.querySelector('.modal-body input')

  modalTitle.textContent = `New message to ${recipient}`
  userPlaylists.textContent = JSON.stringify(allPlaylists);
  modalBodyInput.value = recipient
})