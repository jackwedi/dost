const router = require('express').Router();

router.route('/').get((req, res) => {
    res.json(["Jack", "John", "Paul"])
});

module.exports = router;