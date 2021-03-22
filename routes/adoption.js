const express = require('express');
const router  = express.Router();

const { requiresAuth } = require('express-openid-connect');

const adoptionController = require('../controllers/adoptionController');

router.get('/', requiresAuth(), adoptionController.getAllAdoptionsAsync);
router.post('/', requiresAuth(), adoptionController.postNewAdoptionAsync);

router.get('/:_id', requiresAuth(), adoptionController.getAdoptionAsync);
router.delete('/:_id', requiresAuth(), adoptionController.deleteAdoptionAsync);

module.exports = router;