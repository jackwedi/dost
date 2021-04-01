const router = require('express').Router();
const User = require('../models/user.model').User;

router.route('/:googleId').get(async (req, res) => {
    const user = await User.findOne({
        googleID: req.params.googleId
    });
    console.log("FOUND", user, req.body)
    return res.send(user);
});

router.route('/addwish/:googleId/:item').post(async (req, res) => {
    const user = await User.findOneAndUpdate({
        googleID: req.params.googleId
    }, {
        $push: { wishList: req.params.item }
    }, {new: true});
    console.log("Updated WISHLIST", user.name, user.wishList);
    return res.send(user);
});

router.route('/removewish/:googleId/:item').post(async (req, res) => {
    const user = await User.findOneAndUpdate({
        googleID: req.params.googleId
    }, {
        $pull: { wishList: req.params.item }
    }, {new: true});
    console.log("Updated WISHLIST", user.name, user.wishList);
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

    User.create({
        googleID: param.googleID,
        name: param.name,
        dateOfBirth: param.dateOfBirth,
        wishlist: param.wishlist || [""]
    }, (err, doc) => {
        if (err) return res.status(400).json('Error: ' + err);
        return res.send(doc);
    });
});

module.exports = router;