const mongoose = require("mongoose");

// adoption schema
const AdoptionSchema = new mongoose.Schema({
    _id: {type:Number, required:true},
    first: String,
    middle: String,
    last: String,
    petName: String,
    petID: Number,
    phone: Number,
    address: String,
    ownPets: Boolean,
    ownPetsNames: String,
    ownPetsBreeds: String,
    ownPetsBehavior: String,
    vetName: String,
    vetNumber: Number,
    housingtype: String,
    hasYard: Boolean,
    everSurrendered: Boolean,
    numberOfChildren: Number,
    hoursAlone: Number,
    willCrate: Boolean,
    emergencyPetStay: String,
    discipline: String,
    referenceName: String,
    referenceNumber: Number,
    animalConvict: Boolean,
    convictDescription: String

});

const Adoption = mongoose.model('adoptions', AdoptionSchema);
module.exports = Adoption;