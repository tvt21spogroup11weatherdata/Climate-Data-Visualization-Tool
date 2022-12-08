const express = require('express')
const config = require("../../auth.config");
const router = express.Router()
const User = require('../../models/user/user_Model')
const Collections = require('../../models/collections/collections_Model')
var jwt = require("jsonwebtoken");

router.post('/', async (req, res) => {
    User.findOne({
        username: req.body.username
      })
        .exec((err, user) => {
            let token = req.headers["x-access-token"];
            if (!token) return res.status(403).send({ message: "No token provided!" });

            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) return res.status(401).send({ message: "Unauthorized!" });
                req.userId = decoded.id;
                deleteUserCollections(req, res, user)
            });
    })
})
async function deleteUserCollections(req, res, user){
    try {
        const result = await Collections.deleteMany({"createdBy": req.body.username})
        deleteUser(req, res)
    } catch (err) {res.status(500).json({message: err.message})}
}
async function deleteUser(req, res){
    try {
        const result = await User.deleteOne({"_id": req.userId });
        res.status(200).json(result)
    } catch(err) {res.status(500).json({message: err.message})}
}


module.exports = router
