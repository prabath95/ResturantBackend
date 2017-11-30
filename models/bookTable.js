var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookTableSchema = new Schema({
  tableNO:{
    type: String,
    required: true
  },
  peopleCount: {
    type: Number,
    required: true
  },
  Date: {
    type: Date,
    required: true,
  },
  StartTime: {
    type: String,
    required: true,
  },
  EndTime: {
    type: String,
    required: true,
  },
  contact:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model('BookTable', bookTableSchema);
