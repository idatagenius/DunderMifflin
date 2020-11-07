const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Home Page
router.get('/', (req, res) => res.render('home'));

// Order Page
router.get('/order', ensureAuthenticated, (req, res) => 
    res.render('order', {
        name: req.user.name
    }));


// Display Orders Page
const Order = require('../models/Order')
router.get('/display-orders', function(req, res){
    Order.find({}, function(err, orders){
        if(err){
            console.log(err);
        } else {
            res.render('display-orders', {orders: orders,})
        }  
    })
})

// Order Handle
router.post('/order', (req, res) => {
    const { name, product, amount, employee } = req.body;
    let errors = []

    if (!name || !product || !amount || !employee) {
    errors.push({ msg: 'Please enter all fields' });
    }

    if (employee !== 'Dwight Schrute' || 'Jim Halpert' || 'Karen Filippell' || 'Phyllis Vance' || 'Stanley Hudson' || 'Andy Bernard') {
      errors.push({ msg: 'This employee was not found in our database.' });
    }

    // if (product != 'Printing Paper' || 'Converting Paper' || 'Digital Paper' || ) {
    //   errors.push({ msg: 'Password must be at least 6 characters' });
    // }

    if (errors.length > 0) {
    //   console.log(errors);
      res.render('order', {
        errors,
        name,
        product,
        amount,
        employee
      });
    } else { 
      User.findOne({name: name})
      .then(user => {
          if(user){
              // User Exists!!
              const newOrder = new Order ({
                  name,
                  product,
                  amount,
                  employee,
                  status: "Completed"
              });
              console.log(newOrder);
              newOrder.save();
              res.redirect('/');
          } else {
              errors.push({ msg: 'User not registerd or logged in'});
              res.render('register')
          }
      }) 
    }
});
module.exports = router;