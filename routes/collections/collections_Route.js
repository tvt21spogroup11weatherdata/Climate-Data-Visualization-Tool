const { json } = require('express')
const express = require('express')
const router = express.Router()
const Collections = require('../../models/collections/collections_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await Collections.find()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

router.post('/create', async (req, res) => {
    try {
        //var testVisualizations = [{dataIndex: 4, seriesEnabled: [true,true,true], description: "desci"}, {dataIndex: 1, seriesEnabled: [true,true,true], description: "desci2"}]

        var newCollection = new Collections({ formatType: req.body.formatType, visualizations: req.body.visualizations});
        newCollection.save(function (err, coll) {
        if (err) return console.error(err);
            res.status(200).json(coll._id)
        })

    } catch (err) {res.status(500).json({message: err.message})}
})

//Get collection with id
router.get('/:collectionID', async (req, res) => {
    try {
        const result = await Collections.find({"_id": req.params.collectionID})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

//Delete collection with id
router.get('/delete/:collectionID', async (req, res) => {
    try {
        const result = await Collections.deleteOne({"_id": req.params.collectionID });
        res.status(200).json(result)
    } catch(err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/test/datatest', async (req, res) => {
    try {
        const result = await Collections.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})
module.exports = router