const jwt = require('jsonwebtoken');
const userModel = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            return res.json({
                status: 'NOT_AUTHENTICATE',
                msg: 'User does not exits or token has expired'
            })
        }

        req.token = token;
        req.user = user;
        next();
    }
    catch (e) {
        console.log(e);
        return res.json({
            status: 'ERROR',
            msg: 'Something went wrong. Please try again'
        })
    }
}

module.exports = auth;