const mongoose = require('mongoose');

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
    }
})

const credentials = mongoose.model('userCred', schema);

module.exports = credentials;
