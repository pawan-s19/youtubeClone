let SignInform = document.querySelector('#signInForm');
let signUpForm = document.querySelector('#signUpForm');
let Umessage = document.querySelector(".u-validation")
let input = document.querySelectorAll('.input');
let uinp = document.querySelector('.u-inp');
let pinp = document.querySelector('.p-inp');
let username = document.querySelector('.uName');
let email = document.querySelector('.uEmail');
let normalName = document.querySelector('.Name');
let password = document.querySelector('.uPassword');

SignInform.addEventListener('submit', (e) => {
    e.preventDefault();
    if(uinp.value.length > 0 && pinp.value.length > 0){
        SignInform.submit();
    }
});

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(username.value.length > 0 && email.value.length > 0 && normalName.value.length && password.value.length){
        signUpForm.submit();
    }
});

input.forEach(e => {
    e.addEventListener('blur', function(e){
        makeInpRed(e.target.parentNode.children);
    });
});

function makeInpRed(target){
    if(target[1].value.length <= 0){
        target[1].classList.add('userInputRed');
        target[2].style.display = "block"
    }else{
        target[1].classList.remove('userInputRed');
        target[2].style.display = "none"
    }
}