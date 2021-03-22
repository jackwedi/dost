const router = require('express').Router();
const User = require('../models/user.model').User;

router.route('/').get((req, res) => {
    const param = req.body;
    return res.json(User.findById(param.userID));
});

router.route('/').post(async (req, res) => {
    const param = req.body;
    const userAlreadyRegistered = await User.findOne({
        googleID: param.googleID
    });

    if (userAlreadyRegistered) {
        console.log(`User ${param.name} is already registered in the database`);
        return res.status(400).json(`User ${param.name} is already registered in the database`);
    }

    await User.create({
        googleID: param.googleID,
        name: param.name,
        dateOfBirth: param.dateOfBirth,
        wishlist: param.wishlist || [""]
    }, (err, doc) => {
        if (err) {
            return res.status(400).json('Error: ' + err);
        } else {
            return res.send(doc);
        }
    });

});

module.exports = router;