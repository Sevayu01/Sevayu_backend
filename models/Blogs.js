const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    hospital_id: {
        type: String,
    },
    author: {
        type: String, 
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
},{timestamps:true});
module.exports = mongoose.model('Blogs', Schema);