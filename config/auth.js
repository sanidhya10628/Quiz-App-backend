const userModel = require('../models/user')

const auth = async (req, res, next) => {
    try {

        // for demo purpose
        const user = await userModel.findOne({ email: "sanidhya10628@gmail.com" });
        if (!user) {
            throw new Error("User Doest Not Exist");
        }
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send("auth main hoon");
    }
}

module.exports = auth;