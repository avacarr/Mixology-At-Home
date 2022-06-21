var express = require('express');
var router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Users = require('../models/users');
const Recipes = require('../models/recipes');
const All = require('../models/all');
const { rawListeners } = require('../models/users');

var loggedIn
const types = ["Vodka", "Gin", "Whiskey", "Rum", "Tequila", "Brandy", "Liqueurs", "Beer", "Wine", "Cider", "Other", ]


router.get('/', function(req, res) {
  loggedIn = []
  console.log("USER LOGGED OUT BY /")
  res.redirect('/login');
});

router.get('/login', function(req, res) {

  res.render('login');
})

router.get('/login/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/login/callback', passport.authenticate(
  'google', 
  {
    successRedirect : '/user', 
    failureRedirect : '/login'
  }));

router.get('/logout', function(req, res){
  loggedIn = [];
  console.log("USER LOGGED OUT BY /LOGOUT")
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

router.get('/user', async function(req, res) {
  if (loggedIn = []) {
    loggedIn = req.user;
    console.log("USER LOGGED IN")
  }
  let user = await Users.findOne({"username":loggedIn.username, createNew: false})
  let all = await All.find({})
  let recipes = await Recipes.find({})
  let favorites = await Recipes.find({"_id": user.favorites})
  let available = await All.find({"_id": user.available})
  var recommended = []
  recipes.forEach((el1) => el1.required.forEach((el2) => available.forEach((el3) => {if (el3.name.includes(el2.name) && !recommended.includes(el1)){recommended.push(el1)}})))
  
  console.log(available)
  console.log(recommended)
  //let recommended = []
  
  res.render('user/index', {user, all, recipes, favorites, available, recommended, createNew: false})
})

router.post('/user', async function (req, res) {
  if (req.body.available !== undefined) {
    if (typeof req.body.available != "string") {
      req.body.available.pop()
      loggedIn.available = req.body.available
    } else {
      loggedIn.available = []
    }
  } else if (req.body.favorites !== undefined) {
    if (typeof req.body.favorites != "string") {
      req.body.favorites.pop()
      loggedIn.favorites = req.body.favorites
    } else {
      loggedIn.favorites = []
    }
  }
  await Users.findByIdAndUpdate(loggedIn._id, loggedIn)

  res.redirect('/user')
})

router.get('/user/ingredients', async function(req, res) {
  let allIngredients = await All.find({})
  res.render('user/showAll', {allIngredients, types, recipe: false, createNew: true})
})

router.get('/user/ingredients/new', function(req, res) {
  res.render('user/new', {recipe: false, types, createNew: false})
})

router.post('/user/ingredients', async function(req, res) {
  let newIngredient = new All(req.body)
  let checkIngredient = await All.findOne({"name": req.body.name})
  if (!checkIngredient && newIngredient.name != "" && newIngredient.type != "undefined") {
    newIngredient.createdBy = loggedIn.email
    newIngredient.save()
  }
  res.redirect('/user/ingredients')
})

router.get('/user/ingredients/:id', async function(req, res) {
  let ingredient = await All.findOne({"_id": req.params.id})
  res.render('user/show', {item: ingredient, allIngredients: [], types, recipe: false, createNew: false})
})

router.patch('/user/ingredients/:id', async function(req, res) {
  await All.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/user/ingredients/' + req.params.id)
})

router.get('/user/cocktails', async function(req, res) {
  let cocktails = await Recipes.find({})
  res.render('user/showAll', {cocktails, recipe: true, createNew: true})
})

router.get('/user/cocktails/new', async function(req, res) {
  let allIngredients = await All.find({})
  res.render('user/new', {allIngredients, types, recipe: true, createNew: false})
})

router.post('/user/cocktails', async function(req, res) {
  req.body.required = []
  var loop = req.body.amount.length - 1
  console.log(req.body)
  for (let i = 0; i <= loop; i++) {
    req.body.required[i] = {"name": req.body.name[1], "amount": req.body.amount[0]};
    req.body.name.splice(1,1);
    req.body.amount.splice(0,1);
  }
  delete req.body.amount
  req.body.name = req.body.name[0]
  req.body.createdBy = loggedIn.email
  let newCocktail = new Recipes(req.body)
  let checkRecipes = await Recipes.findOne({"name": req.body.name})
  if (!checkRecipes) {
    newCocktail.save()
  }
  res.redirect('/user/cocktails')
})

router.get('/user/cocktails/:id', async function(req, res) {
  let allIngredients = await All.find({})
  let cocktail = await Recipes.findOne({"_id": req.params.id})
  res.render('user/show', {cocktail, types, allIngredients, recipe: true, createNew: false})
})

router.patch('/user/cocktails/:id', async function(req, res) {
  req.body.required = []
  var loop = req.body.amount.length - 1
  for (let i = 0; i <= loop; i++) {
    req.body.required[i] = {"name": req.body.name[1], "amount": req.body.amount[0]};
    req.body.name.splice(1,1);
    req.body.amount.splice(0,1);
  }
  delete req.body.amount
  req.body.name = req.body.name[0]
  req.body.createdBy = loggedIn.email
  console.log(req.body)
  await Recipes.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/user/cocktails/' + req.params.id)
})


module.exports = router;
