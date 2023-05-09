const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default:''
  },
  date_of_birth: {
    type: String,
    default:'',
  },
  rollno:{
    type:String,
    required:true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  campus: {
    type: String,
    default:'',
  },
  branch:{
    type:String,
    default:'',
  },
  category: {
    type: String,
    default:'',
  },
  team: {
    type: Number,
    default:'',
  },
  programming_lang_known: {
    type: String,
    default:'',
  },
  college_activities: {
    type: String,
    default:'',
  },
  iit_internships: {
    type: String,
    default:'',
  },
  github: {
    type: String,
    default:'',
  },
  linkedin: {
    type: String,
    default:'',
  },
  password:{
    type:String,
    required:true,
  },
  confirmpassword:{
    type:String,
    required:true,
  }
});
module.exports = mongoose.model("Student", Student);