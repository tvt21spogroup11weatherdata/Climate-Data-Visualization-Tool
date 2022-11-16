const mongoose = require('mongoose')

const maunaLoaCO2MonthlySchema = new mongoose.Schema({
    year: {
        type: Number
    },
    month: {
        type: Number
    },
    "decimal date": {
        type: Number
    },
    average: {
        type: Number
    },
    "deseasonalized": {
        type: Number
    },
    ndays: {
        type: Number
    },
    sdev: {
        type: Number
    },
    unc: {
        type: Number
    }
})

module.exports = mongoose.model('MaunaLoaCO2Monthly', maunaLoaCO2MonthlySchema, 'mauna_loa_monthly_mean')