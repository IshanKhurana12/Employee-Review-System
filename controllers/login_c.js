
const Login=require('../models/login');




module.exports.login=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/feedback');
    }
    res.render('login_page');
}


const email="admin@1"
const password=1;
Login.findByIdAndUpdate({
    name:'admin',
    email:email,
    password:password,
    admin:'True'
},function(err,user){
    if(err){
        console.log(err);
    }
    console.log("user created")

})

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/feedback');
    }
    res.render('create_user');
}


module.exports.create=function(req,res){
    
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Login.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            Login.create({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password
            }, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/feedback');
            })
        }else{
            return res.redirect('back');
        }

    });
   
}

module.exports.feedback=function(req,res){
        Login.find({},function(err,users){
            if(err){
                console.log(err);
            }
            
            res.render('feedback_page',{
                users:users
            });
        })
       
     
   
}

module.exports.signin=(req,res)=>{
console.log(req.body.email);
         return res.redirect('/feedback');
}

module.exports.logout=(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}


module.exports.delete=function(req,res){
    Login.findById(req.user.id,function(err,user){
        if(user){
            if(user.admin=='True'){
    Login.findByIdAndDelete(req.params.id,function(err){
       if(err){ console.log(err)
}
console.log('deleted');
})
}
}

})
return res.redirect('back');
}


module.exports.update=function(req,res){
    Login.findById(req.user.id,function(err,user){
        if(user){
            if(user.admin=='True'){
                Login.findByIdAndUpdate(req.params.id,{admin:req.body.admin},function(err){
                    if(err){ console.log(err)
             }
             console.log('updated');
             })
            }
        }

    })


return res.redirect('/feedback');
}


module.exports.updateform=function(req,res){
   
    res.render('updateform',{
        id:req.params.id
    })
}

