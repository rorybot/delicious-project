const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.homepage)
router.get('/add', storeController.addStore)
router.post('/add', storeController.createStore)

module.exports = router;
