const express = require('express')
const router = express.Router()
const VostokIceCoreCO2 = require('../../models/vostok_ice_core_co2/vostok_ice_core_co2_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await VostokIceCoreCO2.find().sort({Mean_age_of_the_air: -1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromxyearstopresent/:year', async (req, res) => {
    try {
        const result = await VostokIceCoreCO2.find({Mean_age_of_the_air: {$lte: req.params.year}}).sort({Mean_age_of_the_air : -1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await VostokIceCoreCO2.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router
