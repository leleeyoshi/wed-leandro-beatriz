let fields = ["name","email","tel","qtde"]
let requiredFields = ["name","email","tel"]

module.exports = (context, req) => {
    
    return new Promise((resolve, reject) => {
        try {
                    
            let obj = getFieldsFromReq(req)
            if(Object.keys(obj).length < requiredFields.length) {
                context.log(`Format data error: Faltam campos obrigatorios, required fields len: ${requiredFields.length}`)
                return reject({data:"campos obrigatórios"})
            }

            normalizeTel(obj)

            let objKeys = Object.keys(obj);
            for(var i = 0; i < objKeys.length; i++) {
                if(objKeys[i] == 'tel') {
                    obj[objKeys[i]] = normalizeField(obj[objKeys[i]])
                    if(!isValidNumberLength(obj[objKeys[i]])) {
                        context.log(`format data error: tamanho nao permitido cell number : ${obj[objKeys[i]]}`)
                        return reject({data:"tamanho do telefone não permitido"})
                        break;
                    }
                } else {
                    obj[objKeys[i]] = normalizeField(obj[objKeys[i]])
                    if(!isValidFieldLength(obj[objKeys[i]])) {
                        context.log(`format data error: tamanho nao permitido : ${obj[objKeys[i]]}`)
                        return reject({data:"tamanho do campo não permitido"})
                        break;
                    }
                }

            }
            // context.log(`Format data final obj: ${JSON.stringify(obj)}`)
            resolve(obj);
            
        } catch (error) {
            context.log(`format data error: ${error}`)
            reject({data:"campos obrigatórios"})
        }
          
    });
};

let isValidFieldLength = field => {
    return field.length < 150;
}
let isValidNumberLength = field => {
    return field.length == 11;
}

let normalizeTel = obj => {
    obj.tel = obj.tel.replace(/\D/g,'');
}

let getFieldsFromReq = req => {
    return Object.keys(req.body)
            .filter(key => fields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = req.body[key];
                    return obj;
                }, {});
}

let normalizeField = field => {
    return field.replace(/[^a-zA-Z 0-9 áàâãäÁÀÂÃÄéèêêÉÈÊËíìîïÍÌÎÏóòôõöÓÒÔÕÖúùûüÚÙÛçÇ]/g, "").trim()
}