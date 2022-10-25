const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost/sd")

const chartSchema = mongoose.Schema({
image:String,
name:String,
songs:[{
    type:String
}],
username:String
})

chartSchema.plugin(plm);
module.exports = mongoose.model("chart",chartSchema)
