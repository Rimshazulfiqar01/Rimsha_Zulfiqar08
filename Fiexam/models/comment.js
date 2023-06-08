const mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
    author:String,
    content:String,
    liked:String,

})
let Model = mongoose.model("comment",commentSchema);
module.exports = Model;