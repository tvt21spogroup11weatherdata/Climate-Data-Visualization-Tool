const mongoose = require('mongoose')

const collectionsSchema = new mongoose.Schema({
    formatType: {
        type: String
    },
    visualizations: {
        type: Array
    },
    createdBy: {
        type: String
    }
})

module.exports = mongoose.model('Collections', collectionsSchema, 'collections')