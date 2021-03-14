const router = require('express').Router();
const Group = require('../models/group.model');
const User = require('../models/user.model').User;

router.route('/').get((req, res) => {
    res.json(["Jack", "John", "Paul"])
});

router.route('/create').post((req, res) => {
    // Check if group exists ?
    // const name = "1stGroup";
    const users = [new  User({pseudo: "Jack", dateOfBirth: new Date(1994, 9, 13)}), new  User({pseudo: "John"}), new  User({pseudo: "Jeff"})]
    const newGroup = new Group({pseudo: "1stGroup", users });
    newGroup.save()
    .then(() => res.json("Group Created"))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;