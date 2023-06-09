const mongoose = require("mongoose");

let dressSchema = mongoose.Schema({
    Size:String,
    Colour:String,
    Price:String
})
let Model = mongoose.model("Dress",dressSchema);
module.exports = Model;