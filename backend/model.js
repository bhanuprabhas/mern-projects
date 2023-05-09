const mongoose = require('mongoose');

let Registeruser = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    lastname :{
        type : String,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    phone :{
        type : Number,
        unique : true,
    },
    rollnum :{
        type : String,
        required : true,
    },
    city :{
        type : String,
    },
    teamno :{
        type : Number,
    },
    github :{
        type : String,
    },
    linkedin :{
        type : String,
    },
    hackerrank :{
        type : String,
    },
    edyst :{
        type : String,
    },
    password :{
        type : String,
        required:true,
    },
    confirmpassword : {
        type : String,
        required : true,
    }
})









// const ToDo = new mongoose.Schema({
//     todo : {
//        type : String,
//        required : true,
//     }
// })



// module.exports = mongoose.model("ToDo",ToDo);
module.exports = mongoose.model('Registeruser',Registeruser)