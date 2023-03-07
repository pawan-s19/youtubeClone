let Searchinp = document.querySelectorAll('.nav-searchbox form input');
let Searchbtn = document.querySelectorAll('.nav-searchbox form button');
// let micBtn = document.querySelectorAll('.mic');

// Text Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// if(SpeechRecognition){
//     console.log('Browser Supports Speech Recognition')
//     let bigmicBtn = document.querySelector('.big-mic');
//     let smallmicBtn = document.querySelector('.small-mic');

//     bigmicBtn.addEventListener('click', micBtnClick);
//     smallmicBtn.addEventListener('click', micBtnClick);

//     const recognition = new SpeechRecognition();
//     let currentMic;
//     function micBtnClick(){
//         currentMic = this;
//         if(this.classList.contains('ri-mic-fill')){
//             recognition.start();
//         }else{
//             recognition.stop();
//         }
//     }

//     recognition.addEventListener('start', function(){
//         currentMic.classList.remove("ri-mic-off-fill");
//         currentMic.classList.add("ri-mic-fill");
//         console.log('speech recognition active');
//     });
//     recognition.addEventListener('end', function(){
//         console.log(currentMic);
//         currentMic.classList.remove("ri-mic-fill");
//         currentMic.classList.add("ri-mic-off-fill");
//         console.log('speech recognition disconnected');
//     });
// }else{
//     console.log('Browser Do Not Supports Speech Recognition')
// }

if(SpeechRecognition){
    console.log('Browser Supports Speech Recognition')
    let bigmicBtn = document.querySelector('.big-mic');
    let smallmicBtn = document.querySelector('.small-mic');

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    bigmicBtn.addEventListener('click', micBtnClick);
    smallmicBtn.addEventListener('click', micBtnClick);

    function micBtnClick(){
    // let currentMic;
        // currentMic = this;
        if(bigmicBtn.classList.contains("ri-mic-fill")){
            bigmicBtn.classList.add("ri-mic-off-fill");
            bigmicBtn.classList.remove("ri-mic-fill");
            recognition.start();
        }else{
            console.log('hello')
            bigmicBtn.classList.add("ri-mic-fill");
            bigmicBtn.classList.remove("ri-mic-off-fill");
            recognition.stop();
        }
    }

    recognition.addEventListener('start', function(){
        console.log('speech recognition active');
    });
    recognition.addEventListener("result", function(event){
        const transcript = event.results[0][0].transcript;
        console.log(transcript)
        console.log(event)
    })
}else{
    console.log('Browser Do Not Supports Speech Recognition')
}

Searchinp.forEach((inp) => {
    inp.addEventListener('click', () =>{
        console.log('hey')
    })
    inp.addEventListener('input', function(){
        if(this.value.length > 0){
            this.nextSibling.nextSibling.disabled = false;
        }else{
            this.nextSibling.nextSibling.disabled = true;
        }
    })
})

window.addEventListener("online", function() {
  console.log("I am connected to the internet")
})
  
window.addEventListener("offline", function() {
  console.log("Disconnected...so sad!!!")
})

// inp.addEventListener('input', (e) => {
//     if(e.target.value.length > 0){
//         Searchbtn.disabled = false;
//     }else{
//         Searchbtn.disabled = true;
//     }
// })

let openSearchBtn = document.querySelector('.OpenSearch');
let closeSearchBtn = document.querySelector('.CloseSearch');
let smNavBar = document.querySelector('.small-screen-search');

// Utility Functions
let hideSmallScreenSearchBox = () => {
    smNavBar.style.top = '-60px';
    smNavBar.style.opacity = 0;
}

openSearchBtn.addEventListener('click', () => {
    smNavBar.style.top = '0';
    smNavBar.style.opacity = 1;
});
closeSearchBtn.addEventListener('click', () => {
    hideSmallScreenSearchBox();
});


function myFunction(x) {
  if (x.matches) { // If media query matches
  } else {
    hideSmallScreenSearchBox();
  }
}

var x = window.matchMedia("(max-width: 630px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes