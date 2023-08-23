class MainController {
    constructor() {}

    index(req, res) {
        res.status(200).json({ message: 'This is the landing page' });
    }
}

module.exports = new MainController();
