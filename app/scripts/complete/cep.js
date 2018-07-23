let cepValue;



let blurA = document.createEvent('HTMLEvents');
blurA.initEvent('blur', true, false);


let blurS = document.createEvent('HTMLEvents');
blurS.initEvent('blur', true, false);

let blurC = document.createEvent('HTMLEvents');
blurC.initEvent('blur', true, false);


class Cep {

    cleanForm() {
        address.value = ('');
        neighborhood.value = ('');
    }


    get(cep) {


        axios.get('https://viacep.com.br/ws/' + cep + '/json')
            .then(function(response) {

                let data = response.data;

                if (!('erro' in data)) {

                    address.value = data.logradouro;
                    neighborhood.value = data.bairro;
                    state.value = data.uf;
                    state.dispatchEvent(evt);
                    city.value = data.localidade;

                    address.dispatchEvent(blurA);
                    state.dispatchEvent(blurS);
                    city.dispatchEvent(blurC);

                }

            })
            .catch(function(error) {
                console.log(error);
            });
    }



    search(value) {
        cepValue = value;

        let cep = value.replace(/\D/g, '');

        if (cep != '') {

            let validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {

                this.get(cep);


            } else {

                this.cleanForm();
            }
        } else {

            this.cleanForm();
        }
    };
}


document.getElementById('zipcode').addEventListener('blur', function(event) {
    if (cepValue != event.target.value) {
        complete.search(event.target.value);
    }


}, true);

let complete = new Cep();