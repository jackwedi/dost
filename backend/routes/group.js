const router = require('express').Router();
const Group = require('../models/group.model');

router.route('/').get(async (req, res) => {
    const param = req.body;
    const group = await Group.findById(param.groupID).populate("users");
    res.send(group);
});

router.route('/:userId').get(async (req, res) => {
    const param = req.body;
    const group = await Group.find({
        users: req.params.userId
    });
    res.send(group);
});


router.route('/create').post(async (req, res) => {
    const param = req.body;
    Group.create({pseudo: param.pseudo})
    .then(() => res.json(`Created ${param.pseudo} with `))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/join').post(async (req, res) => {
    const param = req.body;

    await Group.updateOne({
        _id: param.groupID
    }, {
        $push: {
            users: param.userId
        },
    },
        {
            new: true,
            upsert: true
        }, 
        (err, response) => {
            if (err) res.status(400).json('Error: ' + err)
            else {
                res.json(response);
            }
        } 
    );
});

module.exports = router;