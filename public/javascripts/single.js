let like = document.querySelector(".like");
let user = like.getAttribute("data-bs-video");
console.log(user);

var copyLinkButton = document.querySelector('.copyLinkButton')

copyLinkButton.addEventListener("click", async (e) => {
    await navigator.clipboard.writeText(window.location.href);
    console.log(window.location.href)
});
