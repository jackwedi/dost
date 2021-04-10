const router = require('express').Router();
const Group = require('../models/group.model');

router.route('/:sharedId').get(async (req, res) => {
    const param = req.params;
    const group = await Group.findOne({sharedId: param.sharedId.replace("~", "#")}).populate("users");
    res.send(group);
});

router.route('/user/:userId').get(async (req, res) => {
    Group.find({ users: req.params.userId })
    .then((value) => {
        console.log("Found groups :", value);
        res.send(value);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post(async (req, res) => {
    const param = req.body;
    try {
        const group = await Group.create({pseudo: param.pseudo});
        const queryRes = await Group.findOneAndUpdate({
            _id: group._id
        }, { sharedId: `${param.pseudo}#${group._id.toString().slice(8, 18)}` },
        { new: true }
        );
        res.send(queryRes);
        console.log(`CREATED GROUP ${queryRes.pseudo} : ${queryRes.sharedId}`);
    } catch(e) {
        console.log("E", e);
    }
});

router.route('/join').post(async (req, res) => {
    const param = req.body;
    console.log(req)
    const queryRes = await Group.findOneAndUpdate({
        sharedId: param.sharedId.replace("~", "#")
    }, { $push: { users: param.userId } },
    { new: true }
    );
    return res.send(queryRes);

});

module.exports = router;