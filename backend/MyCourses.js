//const { text } = require('body-parser');
const mongoose=require('mongoose');
const { Link, useLinkClickHandler } = require('react-router-dom');
//const { string } = require('prop-types');

//const Schema = mongoose.Schema;
const { Schema } = mongoose
// Define the schema
const mySchema= new Schema({
  subject: {
    type: String,
    required: true
  },
  imageURL:{
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

// Create the model
const MyCourses = mongoose.model('MyCourses', mySchema);

module.exports = MyCourses;