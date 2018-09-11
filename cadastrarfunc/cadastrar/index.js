const validator = require('./validator.js');
const emailService = require('./emailService.js');
let config = require("./config");

module.exports = function (context, req) {
    context.log('aaaa', config.emailpass);
    validator(context, req)
    .then((obj) => emailService(obj))
    .then(result => {
        context.res = {
            status: 201,
            body: {data:'ok'}
        }
        context.log('Foi');
        context.done();
    }).catch(err => {
        context.res = {
            status: 400,
            body: err
            }
        context.log('Nao Foi');
        context.done();
    })
};


