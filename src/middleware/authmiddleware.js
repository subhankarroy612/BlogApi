const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.send('User does not have access!')
    }

    try {
        const verification = jwt.verify(token, process.env.TOKEN);

        if (verification) {
            req.user = verification
            next()
        } else {
            return res.send('Wrong credentials')
        }
    } catch (e) {
        return res.send(e.message)
    }
}

module.exports = authmiddleware;