const mongoose = require('mongoose')

const globalghgbysectorSchema = new mongoose.Schema({
    Sector: {
        type: String
    },
    ghg_percentual: {
        type: Number
    }
})

module.exports = mongoose.model('GlobalGHGBySector', globalghgbysectorSchema, 'global_ghg_emissions_by_sector')