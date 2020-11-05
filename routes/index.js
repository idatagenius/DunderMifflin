const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

// Home Page
router.get('/', (req, res) => res.render('home'));

// Order Page
router.get('/order', ensureAuthenticated, (req, res) => 
    res.render('order', {
        name: req.user.name
    }));

module.exports = router;