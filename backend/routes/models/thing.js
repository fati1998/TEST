const mongoose = require('mongoose');

var thingSchema = new mongoose.Schema({
  index: Number,
  user : JSON,

});

module.exports = mongoose.model('Thing', thingSchema);
   