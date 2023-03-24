const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.index || '0'; // "some_value"

let videoPlayingDiv = document.querySelector(`#id${value}`);
let defaultPlayingDiv = document.querySelector(`#id0`);
if(videoPlayingDiv){
    videoPlayingDiv.classList.add("activePlaylist");
}else{
    defaultPlayingDiv.classList.add("activePlaylist");
}

// logic to make disappear and appear the icon div

let Playingvideo = document.querySelector('.videoContainer video');
let prevnextBtnWrapper = document.querySelector('.prevnextBtnWrapper');
let isPaused = true;

Playingvideo.addEventListener('play', (e) => {
    if(!isPaused){
        prevnextBtnWrapper.style.transition = 'opacity 0.05s ease-in-out';
        prevnextBtnWrapper.style.opacity = '1';
    }
    setTimeout(function(){
        prevnextBtnWrapper.style.transition = 'opacity .5s ease-in-out';
        prevnextBtnWrapper.style.opacity = '0';
    },2600)
    isPaused = false;
});

Playingvideo.addEventListener('pause', (e) => {
    isPaused = true;
    prevnextBtnWrapper.style.transition = 'opacity 0.05s ease-in-out';
    prevnextBtnWrapper.style.opacity = '1';
});

Playingvideo.addEventListener('ended', (e) => {
    prevnextBtnWrapper.style.transition = 'opacity 0.05s ease-in-out';
    prevnextBtnWrapper.style.opacity = '1';
    isPaused = true;
    playNextVideoInPlaylist();
});

Playingvideo.addEventListener('mouseenter', (e) => {
    if(!isPaused){
        prevnextBtnWrapper.style.transition = 'opacity 0.05s ease-in-out';
        prevnextBtnWrapper.style.opacity = '1';
        isPaused = false;
    }
});

Playingvideo.addEventListener('mouseout', (e) => {
    if(!isPaused){
        prevnextBtnWrapper.style.opacity = '0';
        prevnextBtnWrapper.style.transition = 'opacity .5s ease-in-out';
        isPaused = false;
    }
});

// logic to automatically play next video on video end

let playlistParent = document.querySelector('.playlistParentWrap');
let numberOfVideos = playlistParent.children.length || 1;


console.log(numberOfVideos, Number(value))
function playNextVideoInPlaylist(){
    if(Number(value) < Number(numberOfVideos - 1)){
        window.location.href = `?index=${Number(value)+1}`;
        console.log('continue')
    }else{
        window.location.href = `?index=${0}`;
        console.log('first')
    }
}

