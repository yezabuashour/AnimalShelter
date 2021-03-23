const express = require('express');
const indexController = require('../controllers/index');

const router  = express.Router();

// landing page declaration
router.get('/', indexController.homeAsync);

module.exports = router;