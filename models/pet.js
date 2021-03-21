const mongoose = require("mongoose");

// pet schema
const PetSchema = new mongoose.Schema({
    _id: {type:Number, required:true},
    name: String,
    dateOfBirth: Date,
    weight: Number,
    breed: String,
    sex: String,
    adopted: Boolean
});

const Pet = mongoose.model('pets', PetSchema);
module.exports = Pet;