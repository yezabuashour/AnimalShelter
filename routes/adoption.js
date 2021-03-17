const express = require('express');
const router  = express.Router();

const adoptionController = require('../controllers/adoption');

router.get('/api/adoption', adoptionController.getAlladoptionsAsync);
router.post('/api/adoption', adoptionController.postNewadoptionAsync);

router.get('/api/adoption/:_id', adoptionController.getadoptionAsync);
router.delete('/api/adoption/:_id', adoptionController.deleteadoptionAsync);

module.exports = router;