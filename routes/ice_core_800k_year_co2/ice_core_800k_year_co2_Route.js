const express = require('express')
const router = express.Router()
const IceCore800kYearCompositeCO2 = require('../../models/ice_core_800k_year_co2/ice_core_800k_year_co2_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await IceCore800kYearCompositeCO2.find().sort({years_before_2016: -1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data from <=x years before 2016
router.get('/fromxyearstopresent/:year', async (req, res) => {
    try {
        const result = await IceCore800kYearCompositeCO2.find({years_before_2016: {$lte: req.params.year}}).sort({years_before_2016 : -1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await IceCore800kYearCompositeCO2.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router
