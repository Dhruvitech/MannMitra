const mongoose = require('mongoose');

const counselorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    // Optional: Add a field for a profile picture
    profilePic: {
        type: String,
        default: 'https://plus.unsplash.com/premium_photo-1672292536199-7a4cf2b78318?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    // // Optional: You could add a field for a list of available times
    // availability: [{
    //     date: Date,
    //     slots: [String]
    // }]
});

module.exports = mongoose.model('Counselor', counselorSchema);