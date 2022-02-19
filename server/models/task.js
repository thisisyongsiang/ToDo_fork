const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({
  title:{type:String,required:true},
  dateTime:{type:String,required:false},
  completed:{type:Boolean,required: true},
  url:{type:String,required:false},
  id:{type:String,required:true},
  order:{type:Number,required:false},
  user:{type:String,required:true}
});
module.exports = mongoose.model('Task',taskSchema);
