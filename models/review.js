const mongoose=require('mongoose');
const reviewSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    reviewfor:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Login',
        required:true 
    },
    permission:{
        type:String

    },
 } ,{
    timestamps:true
});

const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;
