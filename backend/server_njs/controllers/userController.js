const userModel = require('../models/userModel');

class userController {
    constructor() { }

    async findUser(req, res) {
        try {
            const userId = req.params.id;
            const user = new userModel(null, null, null, null, null, null, null);
            const response = await user.getById(userId);
            res.status(200).json({ message: 'User found', results: response });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateUser(req, res){
        try {
            const { id_user, firstName, lastName, email, password, profilePhoto} = req.body;
            const user = new userModel(id_user, firstName, lastName, email, password, null, profilePhoto);
            const userUpdated = await user.update(user);
            if (userUpdated) {
                res.status(200).json({ message: 'User updated' });
            } else {
                res.status(500).json({ message: 'An error has occurred while uploading the User' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new userController();