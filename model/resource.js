const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['video', 'audio', 'article'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    duration: {
        type: String // e.g., '5 min video', '15 min audio'
    }
});

module.exports = mongoose.model('Resource', resourceSchema);