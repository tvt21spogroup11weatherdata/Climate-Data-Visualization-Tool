const { json } = require('express')
const express = require('express')
const router = express.Router()
const Collections = require('../../models/collections/collections_Model')
const User = require('../../models/user/user_Model')
var jwt = require("jsonwebtoken");
const config = require("../../auth.config");

/* Get all collections (for debugging) */ 
router.get('/', async (req, res) => {
    try {
        const result = await Collections.find()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

/* Get all collections by user */
router.get('/:username', async (req, res) => {
    try {
        const result = await Collections.find({createdBy: req.params.username})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})


/* If user found and authorized, create new collection with user tagged*/
router.post('/create', async (req, res) => {
    let collID
    try{
        User.findOne({
            username: req.body.username
        })
            .exec((error) => {
                let token = req.headers["x-access-token"];
                if (!token) return res.status(403).send({ message: "No token provided!" });

                jwt.verify(token, config.secret, (err, decoded) => {
                    if (err) return res.status(401).send({ message: "Unauthorized!" });
                    req.userId = decoded.id;
                    try {
                        var newCollection = new Collections({ formatType: req.body.formatType, visualizations: req.body.visualizations, createdBy: req.body.username});
                        newCollection.save(function (err, coll) {
                            if (err) return console.error(err);
                            collID = coll._id
                            res.status(200).json(collID)
                        })
                    } catch (err) {res.status(500).json({message: err.message})}
                });
            })
    }  catch (err) {res.status(500).json({message: err.message})}
})

/* Get collection by id */
router.get('/c/:collectionID', async (req, res) => {
    try {
        const result = await Collections.find({"_id": req.params.collectionID})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

/* If user found and authorized, delete collection */
router.get('/delete/:collectionID', async (req, res) => {
    try{
        User.findOne({
            username: req.body.username
        })
            .exec((error) => {
                let token = req.headers["x-access-token"];
                if (!token) return res.status(403).send({ message: "No token provided!" });

                jwt.verify(token, config.secret, async (err, decoded) => {
                    if (err) return res.status(401).send({ message: "Unauthorized!" });
                    req.userId = decoded.id;
                    try {
                        const result = await Collections.deleteOne({"_id": req.params.collectionID });
                        res.status(200).json(result)
                    } catch(err) {res.status(500).json({message: err.message})}
                });
            })
    }  catch (err) {res.status(500).json({message: err.message})}
})


module.exports = router