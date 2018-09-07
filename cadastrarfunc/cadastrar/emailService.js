const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Godaddy',
    host: "imap.secureserver.net",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "contato@puntacanabiaeleandro.com.br",
        pass: "awaraw"
    },
    tls: { rejectUnauthorized: false }
});

module.exports = (obj) => {
    
    return new Promise((resolve, reject) => {
        try{
            const mailOptions = {
                from: 'contato@puntacanabiaeleandro.com.br',
                to: 'contato@puntacanabiaeleandro.com.br',
                subject: 'Cadastro do :' + obj.name,
                html: '<h1>Cadastro do ' + obj.name + '</h1>' +
                '<p>Email: ' + obj.email + '</p>' +
                '<p>WhatsApp: ' + obj.tel + '</p>' +
                '<p>Quantidade de pessoas: ' + obj.qtde + '</p>'
            };
            
            transporter.sendMail(mailOptions)
            resolve(obj);

        } catch (error) {
            reject({data:'Erro ao efetuar o cadastro!'})
        }
    })
};
