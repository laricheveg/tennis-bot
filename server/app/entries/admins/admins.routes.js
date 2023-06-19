const express = require('express');
const controllers = require('./admins.controllers');

const router = express.Router();

// GET '/users/ids'
router.post('/signup', controllers.signup);

// GET '/users'
router.post('/signin', controllers.signin);


router.post('/token', controllers.signin);




module.exports = router;
