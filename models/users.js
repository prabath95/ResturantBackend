var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  contact:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
