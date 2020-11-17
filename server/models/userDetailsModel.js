const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    displayName: {
        type: String,
        required: [true, 'displayName is required']
    },
    userName: {
        type: String,
        required: [true, 'userName is required']
    },
    avatarSrc: {type: String},
    posts: {
        type: [],
    },
    following: [],
    followers: []
    
})

const userDetails = mongoose.model('userDetails', schema)

module.exports = userDetails;