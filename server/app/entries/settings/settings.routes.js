const express = require('express');
const controllers = require('./settings.controllers');

const router = express.Router();

// POST '/strategies/switch' body: {userId, strategy, action}
router.post('', controllers.postSettings);

// GET '/strategies/:userId'
router.get('', controllers.getSettings);


module.exports = router;
