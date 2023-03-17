let Searchinp = document.querySelectorAll('.inputArea');
let Searchbtn = document.querySelectorAll('.nav-searchbox form button');
let micBtn = document.querySelectorAll('.mic');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    console.log('Support');
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    let currentMic;
    micBtn.forEach(e=>{
        e.addEventListener('click', function(){
            currentMic = this;
            if(this.classList.contains("ri-mic-fill")){
                currentMic.classList.add("ri-mic-off-fill");
                currentMic.classList.remove("ri-mic-fill");
                currentMic.style.setProperty('--anim', "scale-up-center 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) infinite alternate-reverse");
                currentMic.style.setProperty('--displayMicEffect', "1");
                recognition.start();
            }else{
                runOnMicOff();
                recognition.stop();
            }
        });
    });

    recognition.addEventListener("start", function(){
        focusOnInput();
    });

    recognition.addEventListener("end", function(){
        runOnMicOff();
        focusOnInput();
    })

    recognition.addEventListener("result", function(event){
        const currentIndex = event.resultIndex;
        const transcript = event.results[currentIndex][0].transcript;
        addText(transcript);
    })

    // focusOnInput
    function focusOnInput(){
        Searchinp.forEach(e=>{
            e.focus();
        })
    }

    // AddTextToInput
    function addText(trallVideosCtncript){
        Searchinp.forEach(e=>{
            if(trallVideosCtncript.length > 0){
                e.value = trallVideosCtncript;
                e.nextSibling.nextSibling.disabled = false;
            }
        })
    }

    //RunEventsOnMicOff
    function runOnMicOff(){
        currentMic.classList.add("ri-mic-fill");
        currentMic.classList.remove("ri-mic-off-fill");
        currentMic.style.setProperty('--anim', "0");
        currentMic.style.setProperty('--displayMicEffect', "0");
    }

}else{
    console.log('No Support');
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

let signInBtn = document.querySelector('.signInBtn');
let signUpBtn = document.querySelector('.signUpBtn');

signInBtn?.addEventListener('mouseover',(e) => {
    signUpBtn.style.transform = "translateY(38px)";
    signUpBtn.style.scale = "1";
    signUpBtn.style.opacity = "1";
});

signInBtn?.addEventListener('mouseout', () => {
    setTimeout(() => {
        signUpBtn.style.transform = "translateY(0)";
        signUpBtn.style.scale = ".5";
        signUpBtn.style.opacity = "0";
    }, 2000);
})


function myFunction(x) {
    if (x.matches) { // If media query matches
    } else {
      hideSmallScreenSearchBox();
    }
  }
  
  var x = window.matchMedia("(max-width: 630px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes