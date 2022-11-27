const express = require('express')
const router = express.Router()
const NationalCarbonEmissions = require('../../models/national_carbon_emissions/national_carbon_emissions_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await NationalCarbonEmissions.find().sort({Year: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router