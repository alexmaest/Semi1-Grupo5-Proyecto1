const userModel = require('../models/userModel');

class userController {
    constructor() { }

    async findUser(req, res) {
        try {
            const response = await userModel.findById(1);
            res.status(200).json({ message: 'User created', results: response });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new userController();