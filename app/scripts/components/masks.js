class Mask {

    maskPhone(mascara, documento) {
        document.getElementById('tel').addEventListener('input', function(e) {

            if (e.target.tagName.toLowerCase() === 'input') {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            }
        });
    }
}

const mask = new Mask();
mask.maskPhone();