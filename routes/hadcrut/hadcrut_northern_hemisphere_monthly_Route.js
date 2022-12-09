const express = require('express')
const router = express.Router()
const HadcrutNorthernHemisphereMonthly = require('../../models/hadcrut/hadcrut_northern_hemisphere_monthly_Model')


// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await HadcrutNorthernHemisphereMonthly.find().sort({Year : 1, Month: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data for specific year
router.get('/year/:year', async (req, res) => {
    try {
        const result = await HadcrutNorthernHemisphereMonthly.find({Year: req.params.year}).sort({Year : 1, Month: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await HadcrutNorthernHemisphereMonthly.find({Year: {$gte: req.params.year}}).sort({Year : 1, Month: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await HadcrutNorthernHemisphereMonthly.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router