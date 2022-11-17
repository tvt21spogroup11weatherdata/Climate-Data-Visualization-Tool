const mongoose = require('mongoose')

const iceCore800kYearCompositeCO2Schema = new mongoose.Schema({
    "age_gas_calBP": {
        type: Number
    },
    "co2_ppm": {
        type: Number
    },
    "co2_is_ppm": {
        type: Number
    },
    "years_before_2016": {
        type: Number
    }
})

module.exports = mongoose.model('IceCore800kYearCompositeCO2', iceCore800kYearCompositeCO2Schema, 'ice_core_800k_year_composite_co2')