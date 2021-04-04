const router = require('express').Router();
const Group = require('../models/group.model');

router.route('/').get(async (req, res) => {
    const param = req.body;
    const group = await Group.findById(param.groupID).populate("users");
    res.send(group);
});

router.route('/:userId').get(async (req, res) => {
    Group.find({ users: req.params.userId })
    .then((value) => {
        console.log("Found groups :", value);
        res.send(value);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post(async (req, res) => {
    const param = req.body;
    Group.create({pseudo: param.pseudo})
    .then((value) => {
        console.log("Created group :", value);
        res.send(value);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/join').post(async (req, res) => {
    const param = req.body;
    const queryRes = await Group.findOneAndUpdate({
        _id: param.groupID
    }, { $push: { users: param.userId } },
    { new: true }
    );
    return res.send(queryRes);

});

module.exports = router;