const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  user:{type:String,required:true},
  created:{type:Number,required:true},
  deleted:{type:Number,required:true}
});

module.exports = mongoose.model('UserStats',userSchema);
