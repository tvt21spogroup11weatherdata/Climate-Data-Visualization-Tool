const mongoose = require('mongoose')

const globalghgbysubsectorSchema = new mongoose.Schema({
    Subsector: {
        type: String
    },
    ghg_percentual: {
        type: Number
    }
})

module.exports = mongoose.model('GlobalGHGBySubsector', globalghgbysubsectorSchema, 'global_ghg_emissions_by_subsector')