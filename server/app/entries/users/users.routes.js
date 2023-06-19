const express = require('express');
const controllers = require('./users.controllers');

const router = express.Router();

// GET '/users/ids'
router.get('/ids', controllers.getAllUserIds);

// GET '/users'
router.get('/', controllers.getAllUsers);
router.post('/update/:id', controllers.updateDateForUser);


// router.get('/updateExpritedUsers', controllers.updateExpiredUsers);


// GET '/users/:id'
router.get('/stats', controllers.getStatsByUsers);

router.get('/:id', controllers.getUserById);




// POST '/users' body: {userId, username}
router.post('/', controllers.createUser);

// DELETE '/users' body: {userId}
router.delete('/', controllers.deleteUser);




module.exports = router;
