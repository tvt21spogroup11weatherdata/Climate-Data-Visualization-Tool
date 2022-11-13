const mongoose = require('mongoose')

const hadcrutNorthernHemisphereMonthlySchema = new mongoose.Schema({
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

module.exports = mongoose.model('HadcrutNorthernHemisphereMonthly', hadcrutNorthernHemisphereMonthlySchema, 'hadcrut_northern_hemisphere_monthly')