const mongoose = require('mongoose');
const {Schema} = mongoose;
  
const recipesSchema = new mongoose.Schema({
    name: String,
    recipe: String,
    description: String,
    required: [{ name: String, amount: String }],
    createdBy: String

  });

const Recipes = mongoose.model('Recipes', recipesSchema);
module.exports = Recipes