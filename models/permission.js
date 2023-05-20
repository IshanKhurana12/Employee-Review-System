const mongoose=require('mongoose');
const permissionSchema=mongoose.Schema({
   permission:{
        type:'String',
        required:true
   },

},{
    timestamps:true
});


const Permission=mongoose.model('Permission',permissionSchema);
module.exports=Permission;