const express = require('express')
const router = express.Router()
const HadcrutSouthernHemisphereAnnual = require('../../models/hadcrut/hadcrut_southern_hemisphere_annual_Model')


// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await HadcrutSouthernHemisphereAnnual.find().sort({Year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data for specific year
router.get('/year/:year', async (req, res) => {
    try {
        const result = await HadcrutSouthernHemisphereAnnual.find({Year: req.params.year}).sort({Year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await HadcrutSouthernHemisphereAnnual.find({Year: {$gte: req.params.year}}).sort({Year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await HadcrutSouthernHemisphereAnnual.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router