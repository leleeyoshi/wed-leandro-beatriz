
modalOpen = document.getElementsByClassName('modal__wrap'),
modalContent = document.getElementsByClassName('modal__content'),
messageModal = document.querySelector('.modal__wrap .append'),

document.getElementById('cadastrarSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    sendForm();
});

let sucessMessage = `
    <div class="append modal__sucess">
        <span class="modal__close" id="modal-close" onclick="resetForm()">x</span> Sua confirmação foi recebida com sucesso. Qualquer dúvida entre em contato pelo e-mail: contato@puntacanabiaeleandro.com.br.
    </div>`;

function sendForm() {
    //api.puntacanabiaeleandro.com.br
    let serializedForm = document.getElementById('cadastrarForm');
    let _data = toJSONString(serializedForm);
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
            }

        })
        .catch(function(e) {

            // https://functions.azure.com
            // https://functions-staging.azure.com
            // https://functions-next.azure.com
            // http://www.puntacanabiaeleandro.com.br
            // modalClose();

            // responseForm[0].innerText = e.response.data.data;
            // responseForm[0].style.display = 'block';

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