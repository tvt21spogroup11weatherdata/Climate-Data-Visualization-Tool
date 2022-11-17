const mongoose = require('mongoose')
const vostokIceCoreCO2Schema = new mongoose.Schema({
    Depth: {
        type: Number
    },
    Age_of_the_ice: {
        type: Number
    },
    Mean_age_of_the_air: {
        type: Number
    },
    CO2: {
        type: Number
    }
})

module.exports = mongoose.model('VostokIceCoreCO2', vostokIceCoreCO2Schema, 'vostok_ice_core_co2')