const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const adoptionController = require('../controllers/adoptionController');

const router  = express.Router();

// route declaration with auth
router.get('/', requiresAuth(), adoptionController.getAllAdoptionsAsync);
router.post('/', requiresAuth(), adoptionController.postNewAdoptionAsync);

router.get('/:_id', requiresAuth(), adoptionController.getAdoptionAsync);
router.delete('/:_id', requiresAuth(), adoptionController.deleteAdoptionAsync);

module.exports = router;