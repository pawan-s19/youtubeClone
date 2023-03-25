const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let shareBtn = document.querySelector('#shareBtn');

let httpProtocol = window.location.protocol;
let httpHost = window.location.host;

shareBtn.addEventListener('click', (e) => {
    navigator.clipboard.writeText(`${httpProtocol}//${httpHost}${shareBtn.getAttribute('data-bs-plId')}`);
    shareBtn.setAttribute("data-bs-title", "URL Copied");
})