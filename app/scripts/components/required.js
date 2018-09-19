const elem = document.querySelectorAll('input[required], select[required]');

const isvalid = {
    checkValidity: 'nok'
}

var verifyCallback = function(response) {
    if (response.length) {
        captcha.classList.remove('has-error');
    }
};

class Required {
    validaFormSubmit() {
        const eventT = document.createEvent('HTMLEvents');
        eventT.initEvent('blur', true, false);

        for (var i = 0; i < elem.length; i++) {
            elem[i].dispatchEvent(eventT);
        }
    }

    requiredElem() {

        for (var i = 0; i < elem.length; i++) {
            elem[i].addEventListener('blur', function() {

                const checkValid = document.getElementById('cadastrarForm').checkValidity();

                const msg = this.parentNode.getElementsByClassName('with-errors')[0];

                if (!this.checkValidity()) {

                    this.classList.add('has-error');
                    msg.style.display = 'block';

                    // isvalid.checkValidity = 'nok';

                } else {

                    this.classList.remove('has-error');
                    msg.style.display = 'none';

                }

                if (checkValid) {
                    isvalid.checkValidity = 'ok';
                }
            });
        }
    }
}

const form = new Required();

form.requiredElem();