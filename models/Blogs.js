const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    hospital_id: {
        type: String,
        //  hname, hcontact, hstreet, hcity, hstate, hzip, hemail, hpassword
    },
    author: {
        type: String, 
        // if not then it will be anonymous
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