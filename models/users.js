const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    userId: {source: "String", id: "String"},
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipes' }],
    available: [{ type: Schema.Types.ObjectId, ref: 'All' }]
  });

const Users = mongoose.model('Users', usersSchema);
module.exports = Users