const userModel = require('../models/userModel');

class registerController {
    constructor() { }

    async register(req, res) {
        try {
            const { firstName, lastName, email, password, birthday, profilePhoto } = req.body;
            const user = new userModel(null, firstName, lastName, email, password, birthday, profilePhoto);
            const userByEmail = await user.getByEmail();
            if (userByEmail) {
                res.status(501).send('Account with that email already exist');
            } else {
                const userAdded = await user.save();
                if (userAdded) {
                    res.status(200).send('Account created');
                } else {
                    res.status(503).send('Failed user account creation');
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new registerController();