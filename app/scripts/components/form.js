const modalOpen = document.getElementsByClassName('modal__wrap');
const modalContent = document.getElementsByClassName('modal__content');
const messageModal = document.querySelector('.modal__wrap .append');
const responseForm = document.getElementsByClassName('responseForm');
const cadastrarSubmit = document.getElementsByClassName('cadastrarSubmit');

const sucessMessage = 
    '<div class="append modal__sucess">'+
        '<span class="modal__close" id="modal-close" onclick="resetForm()">x</span> Sua confirmação foi recebida com sucesso. Qualquer dúvida entre em contato pelo e-mail: contato@puntacanabiaeleandro.com.br.'+
    '</div>';

document.getElementById('cadastrarSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    const isValidForm = document.getElementById('cadastrarForm').checkValidity();
    form.validaFormSubmit();

    if(isValidForm){
        cadastrarSubmit[0].disabled = true;
        responseForm[0].innerText = 'Enviando ...';
        responseForm[0].style.display = 'hide';
        sendForm();
    }

});

function sendForm() {
    const serializedForm = document.getElementById('cadastrarForm');
    const _data = toJSONString(serializedForm);
    console.log(_data);
    axios({
            url: 'http://api.puntacanabiaeleandro.com.br/api/cadastrar',
            method: 'POST',
            data: _data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {

            if (response.data.data == 'ok') {
                modalOpen[0].style.display = 'flex';
                modalContent[0].style.display = 'block';
                var div = document.createElement('div');
                div.innerHTML = sucessMessage.trim();
                modalContent[0].appendChild(div);
                $('body').css('overflow', 'hidden');
                cadastrarSubmit[0].disabled = false;
            }

        })
        .catch(function(e) {

            console.log(e.response.data.data);
            responseForm[0].innerText = "Não foi possível cadastrar no momento, tente novamente ou entre em contato pelo e-mail contato@puntacanabiaeleandro.com.br";
            responseForm[0].style.display = 'block';
            cadastrarSubmit[0].disabled = false;
        });

    return false;
}

function toJSONString(form) {
    var obj = {};
    var elements = form.querySelectorAll('input, select, textarea');

    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        obj[element.name] = element.value;
    }

    return JSON.stringify(obj);
}

function resetForm() {
    setTimeout(function() {
        window.location.reload();
    }, 100);
    $('body').css('overflow', 'auto');
}

$(document).ready(function() {

    var date = new Date("2019-06-20T17:00:00");
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000); 

    var clock = $('.clock').FlipClock(diff,{
        clockFace: 'DailyCounter',
        countdown: true,
        autoStart: true,
        language:'pt-br',
    });
});