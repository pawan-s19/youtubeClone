const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let shareBtn = document.querySelector('#shareBtn');

let protocol = window.location.protocol;
let host = window.location.host;

shareBtn.addEventListener('click', (e) => {
    navigator.clipboard.writeText(`${protocol}//${host}${shareBtn.getAttribute('data-bs-plId')}`);
    shareBtn.setAttribute("data-bs-title", "URL Copied");
})