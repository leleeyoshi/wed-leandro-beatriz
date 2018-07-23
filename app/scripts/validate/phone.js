class AddPhone {

    constructor() {
        this.index = 2;
    }


    add() {

        elemAdd.addEventListener('click', function() {
            phone.duplicate();
        });


    }
    refreshIndex() {
        let phones = document.querySelectorAll('.cw-form__input-tel');
        this.index = phones.length + 1;
        phones.forEach((tag, i) => {

            tag.querySelector('span').innerText = i + 1;
        });
    }
    remove() {
        let self = this;
        document.querySelector('#append-phone').addEventListener('click', function(btnEvt) {
            if (btnEvt.target.tagName.toLowerCase() === 'button') {
                btnEvt.target.parentNode.remove();
                self.refreshIndex()

                elemAdd.style.display = 'inline-block';
            }
        });
    }

    duplicate() {

        let i = this.index++;
        let max = 9;

        if (i < max + 1) {
            const template = `
                <div class="cw-form__input-tel">
                    <span>${i}</span> <input name="cell_number" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="phone"/>
                    <button type="button" class="cw-form__remove">remove</button>
                </div>
            `;

            let appendTemplate = this.createElementFromHTML(template)

            appendPhone.appendChild(appendTemplate);

        } else {

            elemAdd.style.display = 'none';
        }

        return false;
    }

    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        return div.firstChild;
    }


}
let phone = new AddPhone();

phone.add();
phone.remove();