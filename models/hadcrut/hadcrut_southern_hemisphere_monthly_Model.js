const mongoose = require('mongoose')

const hadcrutSouthernHemisphereMonthlySchema = new mongoose.Schema({
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

module.exports = mongoose.model('HadcrutSouthernHemisphereMonthly', hadcrutSouthernHemisphereMonthlySchema, 'hadcrut_southern_hemisphere_monthly')