const mongoose = require('mongoose')

const hadcrutGlobalAnnualSchema = new mongoose.Schema({
    Year: {
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

module.exports = mongoose.model('HadcrutGlobalAnnual', hadcrutGlobalAnnualSchema, 'hadcrut_global_annual')