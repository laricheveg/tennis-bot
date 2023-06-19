const express = require('express');
const controller = require('./api.controller');

const router = express.Router();

// POST '/strategies/switch' body: {userId, strategy, action}
router.post('/:buttonId', controller.mirrorButtonClick);

// GET '/strategies/:userId'

module.exports = router;
