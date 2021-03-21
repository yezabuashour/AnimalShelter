const Pet = require('../models/pet');

// returns array of all pets
const mongoGetAllPetsAsync = async () => {
    try {
        let data = await Pet.find({});
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// updates db with new pet document entry
const mongoPostNewPetAsync = async (newPet) => {
    try {
        let data = await Pet.findOne({ _id: newPet._id });
        if (data === null) {
            try {
                let saveResponse = await newPet.save();
                return saveResponse;
            } catch (err) {
                console.error(err);
                return ({ Error: err });
            }
        }
        return ({ message: "Pet with that _id already exists." });
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// returns a single pet by id
const mongoGetPetAsync = async (_id) => {
    try {
        let data = await Pet.findOne({ _id: _id });
        if (!data) return ({ message: "Pet does not exist." });
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// updates pet by id
const mongoPostPetUpdateAsync = async (_id, petUpdate) => {
    try {
        let data = await Pet.findOne({ _id: _id });
        if (!data) return ({ message: "Pet does not exist." });
        data.weight = petUpdate.weight;
        data.adopted = petUpdate.adopted;
        try {
            await data.save();
            return data;
        } catch (err) {
            console.error(err);
            return ({ Error: err });
        }
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// deletes pet by id
const mongoDeletePetAsync = async (_id) => {
    try {
        let data = await Pet.deleteOne({ _id: _id });
        return data;
    } catch (err) {
        console.error(err);
        return ({ Error: err });
    }
};

// get /api/pet middleware
const getAllPetsAsync = async (req, res) => {
    try {
        let data = await mongoGetAllPetsAsync();
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// post /api/pet middleware
const postNewPetAsync = async (req, res) => {
    const newPet = new Pet({
        _id: req.body._id,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        weight: req.body.weight,
        breed: req.body.breed,
        sex: req.body.sex,
        adopted: req.body.adopted
    });

    try {
        let data = await mongoPostNewPetAsync(newPet);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// get /api/pet/:id middleware
const getPetAsync = async (req, res) => {
    try {
        let data = await mongoGetPetAsync(req.params._id);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

const postPetUpdateAsync = async (req, res) => {
    let _id = req.params._id;
    const petUpdate = {
        weight: req.body.weight,
        adopted: req.body.adopted
    };
    if (!petUpdate.weight && !petUpdate.adopted) return res.json({ message: "Only weight or adoption status can be updated." });

    try {
        let data = await mongoPostPetUpdateAsync(_id, petUpdate);
        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// delete /api/pet/:id middleware
const deletePetAsync = async (req, res) => {
    try {
        let data = await mongoDeletePetAsync(req.params._id);
        if (data.deletedCount === 0) return res.json({ message: "Pet does not exist." });
        return res.json({ message: "Pet deleted." });
    } catch (err) {
        console.error(err);
        return res.json({ Error: err });
    }
};

// // renders view for /pets
// const viewAllPetsAsync = async (req, res) => {
//     try {
//         let pets = await mongoGetAllPetsAsync();
//         return res.render("allPets", { pets: pets.toString() });
//     } catch (err) {
//         console.error(err);
//         return res.json({ Error: err });
//     }
// };

// // renders view for /pets/:_id
// const viewPetAsync = async (req, res) => {
//     try {
//         let _id = req.params._id;
//         let pet = await mongoGetPetAsync(_id);
//         return res.render("pet", { pet: pet.toString() });
//     } catch (err) {
//         console.error(err);
//         return res.json({ Error: err });
//     }
// };

module.exports = {
    getAllPetsAsync,
    postNewPetAsync,
    getPetAsync,
    postPetUpdateAsync,
    deletePetAsync,
};