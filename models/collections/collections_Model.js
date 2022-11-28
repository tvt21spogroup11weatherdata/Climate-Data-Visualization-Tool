const mongoose = require('mongoose')

const collectionsSchema = new mongoose.Schema({
    visualizations: {
        type: Array
    }
})

module.exports = mongoose.model('Collections', collectionsSchema, 'collections')