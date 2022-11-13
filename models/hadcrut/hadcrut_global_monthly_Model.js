const mongoose = require('mongoose')

const hadcrutGlobalMonthlySchema = new mongoose.Schema({
    Year: {
        type: Number
    },
    Month: {
        type: Number
    },
    Anomaly: {
        type: Number
    },
    'Lower confidence limit': {
        type: Number
    },
    'Upper confidence limit': {
        type: Number
    }
})

module.exports = mongoose.model('HadcrutGlobalMonthly', hadcrutGlobalMonthlySchema, 'hadcrut_global_monthly')