const mongoose = require('mongoose')

const lawdomeSchema = new mongoose.Schema({
    "Ice_Sample_Code": {
        type: String
    },
    "Sample_Number":{
        type: Number
    },
    "Analysis_Date":{
        type: String
    },
    "Mean_Ice_Depth_m":{
        type: Number
    },
    "Ice_Age_year_AD":{
        type: Number
    },
    "Mean_Air_Age_year_AD": {
        type: Number
    },
    "CO2_Mixing_Ratio_ppm": {
        type: Number
    }
})

module.exports = mongoose.model('Lawdome', lawdomeSchema, 'Law_Dome_CO2')