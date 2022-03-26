const jwt = require('jsonwebtoken');
module.exports = (username) => {
    return jwt.sign(username, process.env.SECRET, { expiresIn: '3600s' });
}
