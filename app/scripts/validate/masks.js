class Mask {
    maskCpf(mascara, documento) {

        let cpf = documento.value;
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return documento.value = cpf;
    }

    maskCep(mascara, documento) {
        let i = documento.value.length;

        let cep = document.getElementById('zipcode').value;
        cep = cep.replace(/\D/g, '');
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
        let valorValido = document.getElementById('zipcode').value = cep;
    }



    maskPhone(mascara, documento) {
        document.getElementById('append-phone').addEventListener('input', function(e) {

            if (e.target.tagName.toLowerCase() === 'input') {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            }
        });
    }
}


let mask = new Mask();
mask.maskPhone();
cpf.addEventListener('keydown', function(e) {
    mask.maskCpf('###.###.###-##', this);
});

zipcode.addEventListener('keydown', function() {
    mask.maskCep('######-###', this);
});