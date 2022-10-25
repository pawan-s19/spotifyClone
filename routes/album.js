const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost/sd")

const albumSchema = mongoose.Schema({
image:String,
name:String,
songs:[{
    type:String
}],
username:String
})

albumSchema.plugin(plm);
module.exports = mongoose.model("album",albumSchema)
