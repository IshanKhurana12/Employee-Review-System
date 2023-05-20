const express=require('express');
const router=express.Router();
const passport=require('passport');
const reviewController=require('../controllers/review');




router.get('/',passport.checkAuthentication,reviewController.view);
router.get('/create/:id',passport.checkAuthentication,reviewController.create);
router.post('/content/:id',passport.checkAuthentication,reviewController.content);
router.get('/delete/:id',reviewController.delete);
router.get('/update/:id',reviewController.update);

router.post('/updatenow/:id',reviewController.updatenow);

module.exports=router;