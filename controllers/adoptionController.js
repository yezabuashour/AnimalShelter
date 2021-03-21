const Adoption = require('../models/adoption');

// returns array of all adoptions
const mongoGetAllAdoptionsAsync = async () => {
    try {
        let data = await Adoption.find({});
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// updates db with new adoption document entry
const mongoPostNewAdoptionAsync = async (newAdoption) => {
    try {
        let data = await Adoption.findOne({ _id: newAdoption._id });
        if (data === null) {
            try {
                let saveResponse = await newAdoption.save();
                return saveResponse;
            } catch (err) {
                console.error(err);
                return ({ Error: err });
            }
        }
        return ({ message: "Adoption with that _id already exists." });
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// returns a single adoption by id
const mongoGetAdoptionAsync = async (_id) => {
    try {
        let data = await Adoption.findOne({ _id: _id });
        if (!data) return ({ message: "Adoption does not exist." });
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// deletes adoption by id
const mongoDeleteAdoptionAsync = async (_id) => {
    try {
        let data = await Adoption.deleteOne({ _id: _id });
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// get /api/adoption middleware
const getAllAdoptionsAsync = async (req, res) => {
    try {
        let data = await mongoGetAllAdoptionsAsync();
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// post /api/adoption middleware
const postNewAdoptionAsync = async (req, res) => {
    const newAdoption = new Adoption({
        _id: req.body._id,
        first: req.body.first,
        middle: req.body.middle,
        last: req.body.last,
        petName: req.body.petName,
        petID: req.body.petID,
        phone: req.body.phone,
        address: req.body.address,
        ownPets: req.body.ownPets,
        ownPetsNames: req.body.ownPetsNames,
        ownPetsBreeds: req.body.ownPetsBreeds,
        ownPetsBehavior: req.body.ownPetsBehavior,
        vetName: req.body.vetName,
        vetNumber: req.body.vetNumber,
        housingType: req.body.housingType,
        hasYard: req.body.hasYard,
        everSurrendered: req.body.everSurrendered,
        numberOfChildren: req.body.numberOfChildren,
        hoursAlone: req.body.hoursAlone,
        willCrate: req.body.willCrate,
        emergencyPetStay: req.body.emergencyPetStay,
        discipline: req.body.discipline,
        referenceName: req.body.referenceName,
        referenceNumber: req.body.referenceNumber,
        animalConvict: req.body.animalConvict,
        convictDescription: req.body.convictDescription
    });

    try {
        let data = await mongoPostNewAdoptionAsync(newAdoption);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// get /api/adoption/:id middleware
const getAdoptionAsync = async (req, res) => {
    try {
        let data = await mongoGetAdoptionAsync(req.params._id);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};


// delete /api/adoption/:id middleware
const deleteAdoptionAsync = async (req, res) => {
    try {
        let data = await mongoDeleteAdoptionAsync(req.params._id);
        if (data.deletedCount === 0) return res.json({ message: "Adoption does not exist." });
        return res.json({ message: "Adoption deleted." });
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

module.exports = {
    getAllAdoptionsAsync,
    postNewAdoptionAsync,
    getAdoptionAsync,
    deleteAdoptionAsync,
};