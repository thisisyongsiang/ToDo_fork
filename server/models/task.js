const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({
  title:{type:String,required:true},
  dateTime:{type:String,required:false},
  completed:{type:Boolean,required: true}
});
module.exports = mongoose.model('Task',taskSchema);
