const loadController = require('./loadController')
const userModel = require('../models/userModel');

class registerController {
    constructor() { }

    async register(req, res) {
        try {
            const { firstName, lastName, email, password, birthday, profilePhoto } = req.body;
            const user = new userModel(null, firstName, lastName, email, password, birthday, null);
            const userByEmail = await user.getByEmail();
            if (userByEmail) {
                res.status(501).json({ message: 'Account with that email already exist' });
            } else {
                const imageUrl = await loadController.uploadImage(profilePhoto);
                if (imageUrl) {
                    user.profilePhoto = imageUrl;
                    const userAdded = await user.save();
                    if (userAdded) {
                        res.status(200).json({ message: 'Account created' });
                    } else {
                        res.status(503).json({ message: 'Failed user account creation' });
                    }
                } else {
                    res.status(500).json({ message: 'An error has occurred while uploading the profile photo' });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new registerController();