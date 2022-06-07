const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  title: String,
  entry: String,
  shipIsBroken: Boolean
  
}, {timestamp: true});

const Logs = mongoose.model('Logs', logSchema);
module.exports = Logs