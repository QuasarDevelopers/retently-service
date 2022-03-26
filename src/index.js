const config = require('./config');
const express = require('express');
const jwt = require('jsonwebtoken');
const getToken = require('./helpers/get.token');
const dotenv = require('dotenv');
const check = require('./helpers/domain.check')
const snapshot = require('./helpers/snapshot')
const errors = require('./errors')
dotenv.config();

const app = new express();
app.use(express.json());
app.use(express.static('public'));


app.post('/api/auth' ,(req,res) => {
    if (!req.body.username || !req.body.password) return res.send({error:'login incorrect'})
    if (!config.logins.find(s => s.login === req.body.username && s.pwd === req.body.password)) return res.send({error:'login incorrect'})
    res.json({token: getToken({ username: req.body.username })});
})

app.post('/api/snap' , (req,res,next) => {
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, async (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user

        if (!(await check(req.body.url))) return res.send({error: errors.not_available})

        let filename = '';// await snapshot(req.body);

        res.send({
            thumbnail: config.host + ':' + config.port + '/images/' + filename + '.png',
            username: req.user.username
        });
    })
})

app.listen(config.port,() => {
    console.log('Server has been started...')
})


