const express = require('express')
const router = express.Router()
const snyder_temperature_evolution = require('../../models/snyder_temperature_evolution/snyder_temperature_evolution_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await snyder_temperature_evolution.find().sort({kyr_BP: 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router