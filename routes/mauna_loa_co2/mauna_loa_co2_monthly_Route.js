const express = require('express')
const router = express.Router()
const MaunaLoaCO2Monthly = require('../../models/mauna_loa_co2/mauna_loa_co2_monthly_Model')

// Get all data
router.get('/', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Monthly.find().sort({year: 1})
        res.status(200).json(result)
    } catch {error} {res.status(500).json({message: err.message})}
})

// Get all data beginning from specific year
router.get('/fromyear/:year', async (req, res) => {
    try {
        const result = await MaunaLoaCO2Monthly.find({year: {$gte: req.params.year}}).sort({year : 1})
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

// Get request with custom query from body for dev purposes. Remove before publication.
router.get('/freeform', async (req, res) => {
    try {
        console.log(req.body.query)
        let query = JSON.parse(req.body.query)
        console.log(query)
        const result = await MaunaLoaCO2Monthly.find(query)
        res.status(200).json(result)
    } catch (err) {res.status(500).json({message: err.message})}
})

module.exports = router