const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = new Schema({
    title:{
        type:String,
        require:true,
        unique: true
    },
    question:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    sampleInput:{
        type: String,
        required: true
    },
    sampleOutput:{
        type: String,
        required: true
    },
    testCases:{
        type: Array,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const Questions = mongoose.model("question", Question);
  module.exports = Questions;

