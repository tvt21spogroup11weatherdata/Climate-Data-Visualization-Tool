const mongoose = require('mongoose')

const humanEvolutionSchema = new mongoose.Schema({
    BP: {
        type: Number
    },
    event: {
        type: String
    }
})

module.exports = mongoose.model('HumanEvolution', humanEvolutionSchema, 'human_evolution')