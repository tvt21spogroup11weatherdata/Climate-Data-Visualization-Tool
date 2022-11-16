const mongoose = require('mongoose')

const maunaLoaCO2AnnualSchema = new mongoose.Schema({
    year: {
        type: Number
    },
    mean: {
        type: Number
    },
    unc: {
        type: Number
    }
})

module.exports = mongoose.model('MaunaLoaCO2Annual', maunaLoaCO2AnnualSchema, 'mauna_loa_annual_mean')