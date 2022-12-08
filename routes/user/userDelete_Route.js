const express = require('express')
const config = require("../../auth.config");
const router = express.Router()
const User = require('../../models/user/user_Model')
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
    var u = null
    User.findOne({
        username: req.body.username
      })
        .exec((err, user) => {
            u = user
            let token = req.headers["x-access-token"];
            if (!token) {
            return res.status(403).send({ message: "No token provided!" });
            }
        
            jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.userId = decoded.id;
            deleteUser(req, res)
            });
    })
})

async function deleteUser(req, res){
    try {
        const result = await User.deleteOne({"_id": req.userId });
        res.status(200).json(result)
    } catch(err) {res.status(500).json({message: err.message})}
}


module.exports = router
