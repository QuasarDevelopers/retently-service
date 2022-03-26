const postman = require('postman');

const pm = new postman();

pm.test("Test name", function () {
    const resp = pm.response.json();
    pm.expect(resp.results.every((res) => {
        return res.uuid != undefined;
    })).to.be.true;


});
