const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamname: {
        type: String,
        required: true,
    },
    admin: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

const team = mongoose.model('team', teamSchema);
module.exports = team;