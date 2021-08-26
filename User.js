const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    EmailId: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    teams: {
        type: Array,
    },
}, { timestamps: true });

const User = mongoose.model('user_data', UserSchema);
module.exports = User;