const mongoose = require('mongoose')

const hadcrutNorthernHemisphereAnnualSchema = new mongoose.Schema({
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

module.exports = mongoose.model('HadcrutNorthernHemisphereAnnual', hadcrutNorthernHemisphereAnnualSchema, 'hadcrut_northern_hemisphere_annual')