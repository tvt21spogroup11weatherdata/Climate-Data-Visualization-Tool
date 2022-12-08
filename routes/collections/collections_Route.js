const { json } = require('express')
const express = require('express')
const router = express.Router()
const Collections = require('../../models/collections/collections_Model')
const User = require('../../models/user/user_Model')
var jwt = require("jsonwebtoken");
const config = require("../../auth.config");

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await Collections.find()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all by user
router.get('/:username', async (req, res) => {
    try {
        const result = await Collections.find({createdBy: {$gte: req.params.username}})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})


router.post('/create', async (req, res) => {
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
            createColl(req, res, u)
            });
    })
})

async function createColl(req, res, u){
    try {
        var newCollection = new Collections({ formatType: req.body.formatType, visualizations: req.body.visualizations, createdBy: username});
        newCollection.save(function (err, coll) {
            if (err) return console.error(err);
            res.status(200).json(coll._id)
        })
    } catch (err) {res.status(500).json({message: err.message})}
}

//Get collection with id
router.get('/:collectionID', async (req, res) => {
    try {
        const result = await Collections.find({"_id": req.params.collectionID})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

router.get('/delete/:collectionID', async (req, res) => {
    try {
        const result = await Collections.deleteOne({"_id": req.params.collectionID });
        res.status(200).json(result)
    } catch(err) {res.status(500).json({message: err.message})}
})



module.exports = router