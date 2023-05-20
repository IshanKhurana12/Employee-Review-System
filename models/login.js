const mongoose=require('mongoose');
const loginSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:String,
        enum:['True','False'],
    }

},{
    timestamps:true
});


const Login=mongoose.model('Login',loginSchema);

module.exports=Login;


