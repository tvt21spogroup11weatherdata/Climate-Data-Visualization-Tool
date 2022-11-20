const express = require('express')
const router = express.Router()
const GlobalGHGBySubsector = require('../../models/global_ghg_emissions/global_ghg_emissions_by_subsector_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await GlobalGHGBySubsector.find()
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router