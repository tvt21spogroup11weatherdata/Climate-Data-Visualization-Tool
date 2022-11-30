const mongoose = require('mongoose')

const collectionsSchema = new mongoose.Schema({
    formatType: {
        type: String
    },
    visualizations: {
        type: Array
    }
})

module.exports = mongoose.model('Collections', collectionsSchema, 'collections')