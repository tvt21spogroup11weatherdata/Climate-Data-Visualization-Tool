const mongoose = require('mongoose')

const hadcrutSouthernHemisphereAnnualSchema = new mongoose.Schema({
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

module.exports = mongoose.model('HadcrutSouthernHemisphereAnnual', hadcrutSouthernHemisphereAnnualSchema, 'hadcrut_southern_hemisphere_annual')