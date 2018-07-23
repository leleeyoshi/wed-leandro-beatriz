//===========
// VARS
//===========

const headerlists = document.querySelectorAll('.header__list-item .header__list-event'),
    bodyElement = document.querySelector('body');


//============
// FUNCTIONS
//============

const animationClass = () => {
    bodyElement.className += ' animate';
};

const scrollTo = () => {
    window.scroll(100, 0);
}

const trocaPagina = (button) => {
    const _attrPage = button.target.getAttribute('data-page');

    if (bodyElement.className.indexOf(_attrPage) <= -1) {
        bodyElement.className = '';
        bodyElement.className += _attrPage;

        animationClass();
        scrollTo();
    }
}


//============
// EVENTS
//============

Array.prototype.forEach.call(headerlists, function(button) {
    button.addEventListener('click', trocaPagina);
});