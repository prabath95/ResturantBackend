var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookTableSchema = new Schema({
  userName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  tableNO:{
    type: String,
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
  price:{
    type: Number,
    required: true
  },
  comments:{
    type: String,
    required: false
  },
});

module.exports = mongoose.model('BookTable', bookTableSchema);
