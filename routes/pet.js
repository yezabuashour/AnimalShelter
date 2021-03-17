const express = require('express');
const router  = express.Router();

const petController = require('../controllers/pet');

router.get('/api/pet', petController.getAllpetsAsync);
router.post('/api/pet', petController.postNewpetAsync);

router.get('/api/pet/:_id', petController.getpetAsync);
router.post('/api/pet/:_id', petController.postpetUpdateAsync);
router.delete('/api/pet/:_id', petController.deletepetAsync);

// router.get('/pets', petController.viewAllpetsAsync);
// router.get('/pets/:_id', petController.viewpetAsync);

module.exports = router;