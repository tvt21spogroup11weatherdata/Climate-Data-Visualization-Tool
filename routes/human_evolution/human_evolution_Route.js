const express = require('express')
const router = express.Router()
const HumanEvolution = require('../../models/human_evolution/human_evolution_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await HumanEvolution.find().sort({BP: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get data after specific year
router.get('/:year', async (req, res) => {
    try {
        const result = await HumanEvolution.find({"BP": {$lte: req.params.year}}).sort({BP:1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})


// Get one data entry for testing
router.get('/test/datatest', async (req, res) => {
    try {
        const result = await HumanEvolution.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})
module.exports = router