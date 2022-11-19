const mongoose = require('mongoose')

const snyder_temperature_evolutionSchema = new mongoose.Schema({
    Year: {
        type: Number
    },
    '2p5': {
        type: Number
    },
    '50': {
        type: Number
    },
    '97p5': {
        type: Number
    }
})

module.exports = mongoose.model('SnyderTemperatureEvolution', snyder_temperature_evolutionSchema, 'snyder_temperature_evolution')