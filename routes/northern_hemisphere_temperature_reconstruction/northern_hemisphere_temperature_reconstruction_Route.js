const express = require('express')
const router = express.Router()
const NorthernHemisphereTemperatureReconstruction = require('../../models/northern_hemisphere_temperature_reconstruction/northern_hemisphere_temperature_reconstruction_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await NorthernHemisphereTemperatureReconstruction.find().sort({Year: 1})
        res.status(200).json(result)
    } catch {error} {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await NorthernHemisphereTemperatureReconstruction.find({Year: {$gte: req.params.year}}).sort({Year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get request with custom query from body for dev purposes. Remove before publication.
router.get('/freeform', async (req, res) => {
    try {
        console.log(req.body.query)
        let query = JSON.parse(req.body.query)
        console.log(query)
        const result = await NorthernHemisphereTemperatureReconstruction.find(query)
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router