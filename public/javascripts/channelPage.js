window.addEventListener('load', () => {
    let route = window.location.href.split('/');
    let selectedClass = route[route.length - 1];
    if(selectedClass){
        let elem = document.querySelector(`.${selectedClass}`);
        elem.style.color = 'white';
        elem.style.borderBottom = '2px solid white';
    }
});