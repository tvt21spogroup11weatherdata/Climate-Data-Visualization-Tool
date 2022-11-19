const mongoose = require('mongoose')

const snyder_temperature_evolutionSchema = new mongoose.Schema({
    Year: {
        type: Number
    },
    'l_2p5': {
        type: Number
    },
    'l_50': {
        type: Number
    },
    'l_97p5': { 
        type: Number
    }
})

module.exports = mongoose.model('SnyderTemperatureEvolution', snyder_temperature_evolutionSchema, 'snyder_temperature_evolution')