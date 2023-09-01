require('dotenv').config();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class LoginController {
    constructor() { }

    async usersLogin(req, res) {
        try {
            const userEmail = req.params.email;
            const userPassword = req.params.password;
            const user = new userModel(null, null, null, userEmail, userPassword, null, null);
            const userByEmail = await user.getByEmail();
            if (!userByEmail) {
                res.status(501).json({ message: 'Account with that email not exist' });
            } else {
                if (userByEmail.Psw !== userPassword) {
                    res.status(501).json({ message: 'Incorrect password' });
                } else {
                    const token = jwt.sign({ userEmail, userPassword }, process.env.AUTH_KEY, { expiresIn: '1h' });
                    res.status(200).json({ token: token, message: 'Successful request' });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async passwordSend(req, res) {
        try {
            res.status(200).json({ message: 'Succesful request' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async passwordUpdate(req, res) {
        try {
            res.status(200).json({ message: 'Succesful request' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new LoginController();