var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
  tableNo:{
    type: String,
    required: true
  },
  noOfChairs: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('table', TableSchema);
