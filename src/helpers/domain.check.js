const request = require('request');
module.exports = (url) => {
    return new Promise((r,e)=>{
        request(url, function (error, response, body) {
            r(!error && response.statusCode === 200)
        })
    })

}
