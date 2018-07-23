let arr = [];

class State {

    get() {
        axios.get('json/estados.json')
            .then(function(response) {

                arr = response.data;
            })
            .catch(function(error) {

            });
    }

    changeState() {
        state.addEventListener('change', filter.appendCity);
    }

    appendCity() {
        let selected = state.value,
            options_cidades = '';


        arr.forEach(function(key, val) {

            if (key.sigla == selected) {

                key.cidades.forEach(function(key_city, val_city) {
                    options_cidades += '<option value="' + key_city + '">' + key_city + '</option>';
                });

            }
        });

        city.innerHTML = options_cidades;

    }
}

let filter = new State();

filter.get();
filter.changeState();