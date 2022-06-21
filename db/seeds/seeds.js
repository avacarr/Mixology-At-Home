
require('../connection')
require('dotenv').config();

const Users = require('../../models/users')
const Recipes = require('../../models/recipes')
const All = require('../../models/all')
const userSeeds = require('./userSeeds.json')
const recipesSeeds = require('./recipeSeeds.json')
const allSeeds = require('./allSeeds.json')

Users.deleteMany({})
.then(() => {
    return Users.insertMany(userSeeds)
}).then ((user) => {
    console.log(user)
}).catch(console.error)
.finally(() => {
    process.exit()
})

// Recipes.deleteMany({})
// .then(() => {
//     return Recipes.insertMany(recipesSeeds)
// }).then ((recipe) => {
//     console.log(recipe)
// }).catch(console.error)
// .finally(() => {
//     process.exit()
// })

// All.deleteMany({})
// .then(() => {
//     return All.insertMany(allSeeds)
// }).then ((all) => {
//     console.log(all)
// }).catch(console.error)
// .finally(() => {
//     process.exit()
// })