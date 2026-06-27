const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin } = require('../controllers/adminController');

router.post('/login', authAdmin);
router.post('/register', registerAdmin); // Setup only

module.exports = router;
