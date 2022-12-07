const express = require('express')
const router = express.Router()
const User = require('../../models/user/user_Model')
var bcrypt = require("bcryptjs");

// Get all data
router.post('/', async (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (user) {
            res.status(400).send({ message: "Username is already in use" })
            return
        }
        else {
            const u = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.pwd, 8),
                collections: []
            });

            u.save((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                }
                res.status(200).send({ message: "Successfully signed up" });
            })
            return
        }
    })

})

module.exports = router
