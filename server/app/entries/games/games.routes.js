const express = require('express');
const controllers = require('./games.controllers');
const router = express.Router();

router.get('/:from/:to', controllers.getGamesFromDb);

module.exports = router;
