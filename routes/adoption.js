const express = require('express');
const router  = express.Router();

const adoptionController = require('../controllers/adoptionController');

router.get('/', adoptionController.getAllAdoptionsAsync);
router.post('/', adoptionController.postNewAdoptionAsync);

router.get('/:_id', adoptionController.getAdoptionAsync);
router.delete('/:_id', adoptionController.deleteAdoptionAsync);

module.exports = router;