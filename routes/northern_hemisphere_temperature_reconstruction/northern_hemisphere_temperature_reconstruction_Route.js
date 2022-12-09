const express = require('express')
const router = express.Router()
const NorthernHemisphereTemperatureReconstruction = require('../../models/northern_hemisphere_temperature_reconstruction/northern_hemisphere_temperature_reconstruction_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await NorthernHemisphereTemperatureReconstruction.find().sort({Year: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await NorthernHemisphereTemperatureReconstruction.find({Year: {$gte: req.params.year}}).sort({Year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get one data entry for testing
router.get('/datatest', async (req, res) => {
    try {
        const result = await NorthernHemisphereTemperatureReconstruction.findOne()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router