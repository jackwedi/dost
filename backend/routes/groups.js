const router = require('express').Router();
const Group = require('../models/group.model');
const User = require('../models/user.model').User;

router.route('/').get((req, res) => {
    res.json(["Jack", "John", "Paul"])
});

router.route('/create').post(async (req, res) => {
    const param = req.body;
    Group.create({pseudo: param.pseudo, users: [new User({ googleId: param.user.googleId, name: param.user.name, dateOfBirth: param.user.dateOfBirth})]})
    .then(() => res.json(`Created ${param.pseudo} with ${param.users.join(`,`)}`))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/join').post(async (req, res) => {
    const param = req.body;

    Group.updateOne({
        _id: param.groupID
    }, {
        $push: {
            users: new User({ googleId: param.user.googleId, name: param.user.name, dateOfBirth: param.user.dateOfBirth}) }
        },
        {
            new: true,
            upsert: true
        }, 
        (err, response) => {
            if (err) res.status(400).json('Error: ' + err)
            else {
                res.json("OK");
            }
        } 
    );


});



module.exports = router;