const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// All Foods Route
router.get('/', (req, res) => {
  res.render('foods/index');
});

// New Food Route
router.get('/new', (req, res) => {
  res.render('foods/new', { food: new Food() });
});

// Create Food Route
router.post('/', (req, res) => {
  const food = new Food({
    name: req.body.name,
    type: req.body.type
  });
  food.save((err, newFood) => {
    if (err) {
      res.render('foods/new', {
        food: food,
        type: type,
        errorMessage: 'Error creating food'
      });
    } else {
      // res.redirect(`food/${newFood.id}`)
      res.redirect('foods');
    }
  });
});

module.exports = router;
