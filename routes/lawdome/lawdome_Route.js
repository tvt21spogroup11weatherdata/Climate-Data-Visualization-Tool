const express = require('express')
const router = express.Router()
const Lawdome = require('../../models/lawdome/lawdome_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await Lawdome.find().sort({"Mean_Air_Age_year_AD": 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get data from specified core
router.get('/:core', async (req, res) => {
    try {
        const result = await Lawdome.find({"Ice_Sample_Code": req.params.core}).sort({"Mean_Air_Age_year_AD": 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})


module.exports = router