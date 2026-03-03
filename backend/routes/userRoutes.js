const express = require('express');
const {fetchUser , addUser , updateUser} = require('../controllers/userController');

const router = express.Router();

router.get('/user/:id' , fetchUser);

router.post('/adduser/:id' , addUser);

router.put('/updateuser/:id' , updateUser);

module.exports = router;