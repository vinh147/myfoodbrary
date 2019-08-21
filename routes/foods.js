const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// All Foods Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const foods = await Food.find({ searchOptions });
    res.render('foods/index', {
      foods: foods,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
});

// New Food Route
router.get('/new', (req, res) => {
  res.render('foods/new', { food: new Food() });
});

// Create Food Route
router.post('/', async (req, res) => {
  const food = new Food({
    name: req.body.name,
    type: req.body.type
  });
  try {
    const newFood = await food.save();
    // res.redirect(`food/${newFood.id}`)
    res.redirect('foods');
  } catch {
    res.render('foods/new', {
      food: food,
      type: type,
      errorMessage: 'Error creating food'
    });
  }
});

module.exports = router;
