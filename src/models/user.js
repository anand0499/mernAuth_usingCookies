const mongoose=require('mongoose')

// One Way 
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
})


//Another way 
// const Schema=mongoose.schema;
// const userSchema=new Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:4
//     }
// })

module.exports=mongoose.model('User',userSchema)