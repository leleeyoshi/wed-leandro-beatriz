let elem = document.querySelectorAll('input[required], select[required]');


const isvalid = {
    checkValidity: 'nok',
    cpf: 'nok',
    catcha: 'nok'
}



var verifyCallback = function(response) {
    if (response.length) {
        captcha.classList.remove('has-error');
    }
};



class Required {
    validaFormSubmit() {
        let eventT = document.createEvent('HTMLEvents');
        eventT.initEvent('blur', true, false);

        for (var i = 0; i < elem.length; i++) {
            elem[i].dispatchEvent(eventT);
        }
    }

    requiredElem() {

        for (var i = 0; i < elem.length; i++) {
            elem[i].addEventListener('blur', function() {

                let checkValid = formElem.checkValidity();

                let msg = this.parentNode.getElementsByClassName('msg-error')[0];


                if (!this.checkValidity()) {

                    this.classList.add('has-error');
                    msg.style.display = 'block';

                    isvalid.checkValidity = 'nok';

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

    requiredCpf() {
        let validaCpf = new ValidaCpf();
        cpf.addEventListener('blur', function(e) {


            let erroMsg = this.parentNode.getElementsByClassName('invalid-error')[0];

            if (!validaCpf.init(this.value)) {

                this.classList.add('has-required-error');
                erroMsg.style.display = 'block';

                isvalid.cpf = 'nok';

            } else {

                this.classList.remove('has-required-error');
                erroMsg.style.display = 'none';

                isvalid.cpf = 'ok';


            }
        });

    }


    setMinDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        let getYear = today.getFullYear() - 18;
        let fullDate = getYear + '-' + mm + '-' + dd;

        document.getElementById('birthdate').setAttribute('max', fullDate);
    }




}

let form = new Required();


form.requiredElem();
form.requiredCpf();
form.setMinDate();