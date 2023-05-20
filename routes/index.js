const express=require('express');
const router=express.Router();
const passport=require('passport');
const loginController=require('../controllers/login_c');

router.get('/',loginController.login);

router.get('/create',loginController.signup);

router.post('/user-create',loginController.create);

router.post('/signin',passport.authenticate(
    'local',
    {failureRedirect:'/signin'},

),loginController.signin);

router.get('/feedback',passport.checkAuthentication,loginController.feedback);

router.get('/signout',loginController.logout);

router.get('/delete/:id',passport.checkAuthentication,loginController.delete);

router.post('/update/:id',loginController.update);
router.get('/updateform/:id',loginController.updateform);
router.use('/review',require('./review'));
router.use('/permission',require('./permission'));
module.exports=router;