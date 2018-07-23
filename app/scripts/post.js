let responseForm = document.getElementsByClassName('responseForm');
let append = new AddPhone();

let confirmMessage = `
    <div class="append modal__confirm">
        Por favor, certifique-se que as informações vinculadas a este CPF estão corretas. Após a confirmação, não será possível realizar outro cadastro ou efetuar atualização dos dados. <br><br> Deseja finalizar o cadastro?
        <br><br>
        <button class="btn-confirm confirm-submit" id="yes" onclick="yesSend()">Sim</button>
        <button class="btn-confirm no-confirm-submit" id="no" onclick="noSend()">Não</button>
    </div>`;

let sucessMessage = `
    <div class="append modal__sucess">
        <span class="modal__close" id="modal-close" onclick="resetForm()">x</span> Seu cadastro foi recebido com sucesso. Os dados cadastrais estão sendo analisados. <br><br> Caso haja alguma irregularidade, entraremos em contato.
        <br><br>A Claro agradece.
    </div>`;



function sendForm() {

    let serializedForm = document.getElementById('cadastro-pre');
    let inputs;

    inputs = document.querySelectorAll('input[name=\'cell_number\']');
    let _data = toJSONString(serializedForm);

    axios({
            url: '/api/Cadastrar',
            method: 'POST',
            data: _data,
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function(response) {

            if (response.data.data == 'ok') {

                modalOpen[0].style.display = 'flex';
                modalContent[0].style.display = 'block';

                let appendSucess = append.createElementFromHTML(sucessMessage);
                modalContent[0].appendChild(appendSucess);

                responseForm[0].style.display = 'none';

                let responseData = [];

                responseData.push(response.config.data);

                const lengthNumber = JSON.parse(responseData[0]).cell_number.length;

                dataLayer.push({
                    'event': 'conversion',
                    'eventCategory': 'claro:cadastro-pre',
                    'eventAction': 'envio-formulario',
                    'eventLabel': 'sucesso:' + lengthNumber + '-telefones'
                });
            }

        })
        .catch(function(e) {
            modalClose();

            responseForm[0].innerText = e.response.data.data;
            responseForm[0].style.display = 'block';

            dataLayer.push({
                'event': 'event',
                'eventCategory': 'claro:cadastro-pre',
                'eventAction': 'envio-formulario',
                'eventLabel': 'erro'
            });

        });

    return false;
}

function cleanPhone() {
    let elemRemove = document.querySelectorAll('.cw-form__input-tel');

    for (var i = 1; i < elemRemove.length; i++) {
        elemRemove[i].remove(elemRemove[i]);
    }
}

function noSend() {
    modalClose();
}




function yesSend() {

    modalClose();

    responseForm[0].innerText = 'Enviando ...';
    responseForm[0].style.display = 'block';

    sendForm();

}



function modalClose() {
    modalOpen[0].style.display = 'none';
    modalContent[0].style.display = 'none';

    let elemRemove = document.querySelector('.append');


    if (elemRemove) {
        elemRemove.parentElement.removeChild(elemRemove);
    }

}



function resetForm() {
    setTimeout(function() {
        window.location.reload();
    }, 100);
}


let form = new Required();
document.getElementById('btn-send').addEventListener('click', function(event) {
    event.preventDefault();

    var obg = form.requiredElem();
    var cpf = form.requiredCpf();
    let isValidForm = formElem.checkValidity();

    form.validaFormSubmit();

    if (isValidForm && grecaptcha.getResponse()) {

        captcha.classList.remove('has-error');
        isvalid.catcha = 'ok';

        if (isvalid.checkValidity === 'ok' && isvalid.cpf === 'ok' && isvalid.catcha === 'ok') {

            modalOpen[0].style.display = 'flex';
            modalContent[0].style.display = 'block';

            let appendConfirm = append.createElementFromHTML(confirmMessage);
            modalContent[0].appendChild(appendConfirm);

        }

    } else {
        isvalid.catcha = 'nok';
        captcha.classList.add('has-error');
    }

});