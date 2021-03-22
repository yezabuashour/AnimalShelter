const express = require('express');
const router  = express.Router();

const { requiresAuth } = require('express-openid-connect');

const petController = require('../controllers/petController');

router.get('/', petController.getAllPetsAsync);
router.post('/', requiresAuth(), petController.postNewPetAsync);

router.get('/:_id', petController.getPetAsync);
router.post('/:_id', requiresAuth(), petController.postPetUpdateAsync);
router.delete('/:_id', requiresAuth(), petController.deletePetAsync);

// router.get('/pets', petController.viewAllpetsAsync);
// router.get('/pets/:_id', petController.viewpetAsync);

module.exports = router;