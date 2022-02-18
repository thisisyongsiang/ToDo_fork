const express=require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const Task =require('./models/task');
const app=express();

mongoose.connect("mongodb+srv://user:user@yscluster.j8iq2.mongodb.net/ToDo?retryWrites=true&w=majority")
.then(()=>{
  console.log('connected to mongodb');
})
.catch(()=>{
  console.log('connection has a problem');
})

//adding bodyparser to express middleware to parse json data
app.use(bodyParser.json());

//add header to resolve cors problem
app.use((req,res,next)=>{
  //allow all domain to access the server
  res.setHeader('Access-Control-Allow-Origin','*');
  //allow non default domains with certain headers specified
  res.setHeader('Access-Control-Allow-Headers',
  'Origin,X-Request-With,Content-Type,Accept');
  //allow only certain http words to send request.
  //options is important as it is an implicit request that is sent
  res.setHeader('Access-Control-Allow-Methods',
  'GET,POST,PATCH,DELETE,OPTIONS,PUT',)
  next();
})

//post tasks to database
app.post('/',(req,res,next)=>{
  const task=new Task({
    title:req.body.title,
    dateTime:req.body.dateTime,
    completed:req.body.completed
  });
  task.save().then(result=>{
    res.status(200).json({
      message:"post requested made",
      taskId:result._id});
  });
});

//get tasks on database
app.get('/',(req,res,next)=>{
  Task.find()
  .then(result=>{
    res.status(200).json({
    message:'posts fetched',
    tasks:result
    });
  })
})

//delete tasks on database
//:id is a dynamic path segment to identify what to delete
app.delete('/:id',(req,res,next)=>{
  Task.deleteOne({_id:req.params.id})
  .then(result=>{
    res.status(200).json({message:"task Deleted"});
  });

})
app.delete('/',(req,res,next)=>{
  Task.deleteMany({completed:true})
  .then(result=>{
    res.status(200).json({messgae:"cleared completed tasks"});
  })
})
//use put request to update to database
app.put('/:id',(req,res,next)=>{
  console.log(req.body);
  const updatedTask=new Task({
    _id:req.body.id,
    title:req.body.title,
    dateTime:req.body.dateTime,
    completed:req.body.completed
  });
  Task.updateOne({_id: req.params.id},updatedTask)
  .then(result=>{
    res.status(200).json({message:"Task Updated"});
  });
})
app.patch('/',(req,res,next)=>{
  console.log(req.body);
  allComplete=req.body.allComplete;
  Task.updateMany({completed:!allComplete},{completed:allComplete})
  .then(result=>{
    res.status(200).json({message:"many Task Updated"});
  });
})

module.exports=app;
