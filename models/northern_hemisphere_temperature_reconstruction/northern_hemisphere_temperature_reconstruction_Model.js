const mongoose = require('mongoose')

const northernHemisphereTemperatureReconstructionSchema = new mongoose.Schema({
    Year: {
        type: Number
    },
    T: {
        type: Number
    },
    LF: {
        type: Number
    },
    "LF-": {
        type: Number
    },
    "LF+": {
        type: Number
    },
    "A-": {
        type: Number
    },
    "A+": {
        type: Number
    },
    "AB-": {
        type: Number
    },
    "AB+": {
        type: Number
    }

})

module.exports = mongoose.model('NorthernHemisphereTemperatureReconstruction', northernHemisphereTemperatureReconstructionSchema, 'northern_hemisphere_2000year_temperature_reconstruction')