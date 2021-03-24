const router = require('express').Router();
const User = require('../models/user.model').User;

router.route('/:googleId').get(async (req, res) => {
    const user = await User.findOne({
        googleID: req.params.googleId
    });
    console.log("FOUND", user, req.body)
    return res.send(user);
});

router.route('/').post(async (req, res) => {
    const param = req.body;
    const userAlreadyRegistered = await User.findOne({
        googleID: param.googleID
    });

    if (userAlreadyRegistered) {
        console.log(`User ${param.name} is already registered in the database`);
        return res.send(userAlreadyRegistered);
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