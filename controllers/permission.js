const Login=require('../models/login');
const Review=require('../models/review');
const Permission=require('../models/permission');

module.exports.give=function(req,res){
    console.log(req.body.users);
    Permission.create({
        permission:req.body.users
       
    })
    console.log("permission given to update");
    res.redirect('back');
}


module.exports.delete=function(req,res){
    console.log(req.body.per);
    Permission.findByIdAndDelete(req.body.permission,function(){
       return res.redirect('/feedback');
    })
}



