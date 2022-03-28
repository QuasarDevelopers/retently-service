/**
 * Postman Test specification
 *
 * Create POST http://tanvltech.top:4500/api/snap
 * Body:
 * {  "url": "https://github.com/", "token": "test" }
 *
 * And paste pre-request script:
 */

const options = {
    url:  'http://tanvltech.top:4500/api/auth',
    method: 'POST',
    header: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "username": "user1",
        "password": "qwerty"
    })
};


pm.sendRequest(options, function (err, res) {
    let json = res.json();
    console.log(json);
    pm.request.headers.add({key: 'Authorization', value: json.token});
});
