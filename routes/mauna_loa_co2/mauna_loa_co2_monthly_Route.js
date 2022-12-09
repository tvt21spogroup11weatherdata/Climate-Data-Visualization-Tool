const express = require('express')
const router = express.Router()
const MaunaLoaCO2Monthly = require('../../models/mauna_loa_co2/mauna_loa_co2_monthly_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Monthly.find().sort({year: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Monthly.find({year: {$gte: req.params.year}}).sort({year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Monthly.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router