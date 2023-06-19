const express = require('express');
const controllers = require('./strategies.controllers');

const router = express.Router();

// POST '/strategies/switch' body: {userId, strategy, action}
router.post('/switch', controllers.switchStrategy);

// GET '/strategies/:userId'
router.get('/:userId', controllers.getStrategiesByUserId);


module.exports = router;
