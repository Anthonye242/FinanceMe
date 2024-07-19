const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

// Route for rendering the dashboard view
router.get('/', async (req, res) => {
    res.render('dashboard');
});


module.exports = router;
