const router = require('express').Router();
const User = require('../models/user.model').User;

router.route('/').get((req, res) => {
    const param = req.body;
    return User.findById(param.userID)
});

router.route('/').post(async (req, res) => {
    const param = req.body;
    const user = await User.create({
        googleID: param.googleID,
        name: param.name,
        dateOfBirth: param.dateOfBirth,
        wishlist: param.wishlist || [""]
    }, (err, doc) => {
        if (err) {
            // res.status(400).json('Error: ' + err)
            return res.status(400).json('Error: ' + err);
        } else {
            return res.send(doc);
        }
    });

});

module.exports = router;