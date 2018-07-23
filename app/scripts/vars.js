const address = document.getElementById('address'),
    city = document.getElementById('city'),
    neighborhood = document.getElementById('neighborhood'),
    state = document.getElementById('state'),
    cpf = document.getElementById('cpf'),
    zipcode = document.getElementById('zipcode'),
    elemAdd = document.getElementById('elemAdd'),
    appendPhone = document.getElementById('append-phone'),
    removeElem = document.getElementsByClassName('removeElem'),
    formElem = document.getElementById('cadastro-pre'),
    btnEnv = document.getElementById('btn-send'),
    modalOpen = document.getElementsByClassName('modal__wrap'),
    modalContent = document.getElementsByClassName('modal__content'),
    messageModal = document.querySelector('.modal__wrap .append'),
    captcha = document.querySelector('.wrap-recaptcha'),
    evt = document.createEvent('HTMLEvents');



evt.initEvent('change', false, true);

window.dataLayer = window.dataLayer || [];