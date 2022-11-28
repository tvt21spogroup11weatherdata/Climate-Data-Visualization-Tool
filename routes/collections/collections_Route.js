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

module.exports = router