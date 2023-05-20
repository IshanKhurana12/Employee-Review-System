const Login=require('../models/login');
const Review=require('../models/review');
const Permission=require('../models/permission');

//if user is a admin then only show all feedbacks requirement
module.exports.view=function(req,res){
   
        Login.findById(req.user.id,function(err,user){
            if(user){
                if(user.admin=='True'){
                    Review.find({},function(err,users){

                        if(err){
                            console.log(err);
                        }
                        Login.find({},function(err,emp){
                            return res.render('viewReviews',{
                                users:users,
                                emp:emp
                              });
                        })
                    

                    })
                }else{
                    
                    Permission.findOne({permission:req.user.id},function(err,rev){
                        if(err){
                            console.log(err);
                            return res.redirect('back');
                        }
                        console.log(rev);
                        if(rev){
                            Review.find({},function(err,users){

                                if(err){
                                    console.log(err);
                                }
                            console.log(rev);
                            return res.render('viewReviews',{
                                users:users,
                                emp:null
                        });
                    });
                        }
                       
                      
                    })
               
                }
    
                }
            })
    
    
    
    }



    module.exports.create=function(req,res){
        // console.log(req.params.id);//review for
        // console.log(req.user.id);//by 
        
        res.render('create_review',{
            id:req.params.id
        });

    }

    module.exports.content=function(req,res){
        // console.log(req.params.id);//review for
        // console.log(req.user.id);//by 
        
        Login.findById(req.user.id,function(err,user){
            if(err){
                console.log("No user find",err);
            }
            if(user){
                if(user.admin=='True'){
                    //find the id in  review if there means you can not create new but you can update it
                    Review.findOne({reviewfor:req.params.id},function(err,rev){
                        if(err){
                            console.log("err",err);
                        }
                        if(rev){
                           return res.redirect('back');
                        }
                        //means no review was there so create one
                        else{
                            Review.create({
                                content:req.body.content,
                                reviewfor:req.params.id
                            },function(err,rev){
                                if(err)
                                {
                                    console.log(err);
                                }
                                console.log("review created");
                                return res.redirect('/feedback')
                            })
                        
                        }
                    })



                }
                else{
                   return res.redirect('/feedback');
                }
            }
        })

    }


    module.exports.delete=function(req,res){
        Login.findById(req.user.id,function(err,user){
            if(user){
                if(user.admin=='True'){
                    Review.findByIdAndDelete(req.params.id,function(err,user){
                        if(err){
                            console.log("err in deleteing the Review",err);
                        }
                        console.log("review delted");
                        return res.redirect('back');
                    })
                }
                else{
                    return res.redirect('back');
                }

            }

        })
    }



    module.exports.update=function(req,res){
        Permission.find({},function(err,per){
            Login.find({},function(err,users){
                res.render('review_update',{
                    id:req.params.id,
                    users:users,
                    per:per
                })
            })
          
        })
        
    }


    module.exports.updatenow=function(req,res){
        console.log(req.body.users);//by
        console.log(req.params.id);//for
        Login.findById(req.user.id,function(err,user){
            if(err){
                console.log(err);
            }
            if(user.admin=='True'){
               Review.findByIdAndUpdate(req.params.id,{'content':req.body.content},function(err){
                if(err){
                    console.log(err);
                }
                console.log("updated");
                res.redirect('/feedback')
               })
            }
            else{

                Permission.findOne({permission:req.user.id},function(err,per){
                    if(err){
                        console.log(err);
                        return res.redirect('back');
                    }
                    if(per){
                        Review.findByIdAndUpdate(req.params.id,{'content':req.body.content},function(err){
                            if(err){
                                console.log(err);
                            }
                            console.log("updated");
                            res.redirect('/feedback')
                           })
                    }
                })
                
            }
           
        })

    }