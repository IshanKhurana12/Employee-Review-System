const express=require('express');
const router=express.Router();
const passport=require('passport');
const permissionController=require('../controllers/permission');




router.post('/:id',permissionController.give);
router.post('/delete',permissionController.delete);

module.exports=router;