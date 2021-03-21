const express = require('express');
const router  = express.Router();

const { requiresAuth } = require('express-openid-connect');

const petController = require('../controllers/petController');

router.get('/', requiresAuth(), petController.getAllPetsAsync);
router.post('/', petController.postNewPetAsync);

router.get('/:_id', petController.getPetAsync);
router.post('/:_id', petController.postPetUpdateAsync);
router.delete('/:_id', petController.deletePetAsync);

// router.get('/pets', petController.viewAllpetsAsync);
// router.get('/pets/:_id', petController.viewpetAsync);

module.exports = router;