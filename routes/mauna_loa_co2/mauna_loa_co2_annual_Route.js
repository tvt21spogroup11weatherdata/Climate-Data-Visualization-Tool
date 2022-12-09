const express = require('express')
const router = express.Router()
const MaunaLoaCO2Annual = require('../../models/mauna_loa_co2/mauna_loa_co2_annual_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Annual.find().sort({year: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Annual.find({year: {$gte: req.params.year}}).sort({year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Annual.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router