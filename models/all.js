const mongoose = require('mongoose');
const {Schema} = mongoose;
  
const allSchema = new mongoose.Schema({
    name: String,
    type: String,
    imageUrl: String,
    available: Boolean,
    createdBy: String
  });


const All = mongoose.model('All', allSchema);
module.exports = All

// type: Vodka Gin Rum Whiskey Bourbon Scotch Rye Tequila Mezcal Triple_Sec Soda Beer Mixer Other