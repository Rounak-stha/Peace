const mongoose = require('mongoose'); // same instance of the mongoose in app.js

const schema = new mongoose.Schema({
    displayName: {
        type: String,
        required: [true, 'displayName is required']
    },
    userName: {
        type: String,
        required: [true, 'userName is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    avatarSrc: {
        type: String,
        required: [true, 'avatarSrc is required']
    }
})

// models represent collection and its instance is a document in the collection with the same schema defined above
const credentials = mongoose.model('userCred', schema);

module.exports = credentials;
