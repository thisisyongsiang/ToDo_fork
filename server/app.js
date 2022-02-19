const express=require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const Task =require('./models/task');
const app=express();
const { v4: uuidv4 } = require('uuid');
const UserStat=require('./models/UserStats');

let userStat=null;
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
//upon post, add 1 to the property created in userStat model
app.post('/:user',(req,res,next)=>{
  id=uuidv4();
  const task=new Task({
    user:req.params.user,
    title:req.body.title,
    dateTime:req.body.dateTime?req.body.dateTime:null,
    completed:req.body.completed?req.body.completed:false,
    url:'http://'+req.get('host')+'/' + id,
    id:id,
    order:req.body.order?req.body.order:null
  });
  task.save()
  .then(result=>{
    this.userStat[0].created=this.userStat[0].created+1;
    UserStat.findOneAndUpdate
    ({user:this.userStat[0].user},{created:this.userStat[0].created})
    .then(()=>{
      res.status(200).json(result);
    });
  })
});

//get tasks on database
//creates or get user model from database to log stats of user
app.get('/user/:user',(req,res,next)=>{

  Task.find({user:req.params.user})
  .then(result=>{
    UserStat.find({user:req.params.user})
    .then(user=>{
      if(user.length==0){
        console.log('hi');
        this.userStat=new UserStat({
          user:req.params.user,
          deleted:0,
          created:0,
        });
        this.userStat.save().then(result=>{
          res.status(200).json(result);
        });
      }
      else this.userStat=user;
      console.log(this.userStat);
    })
    return result;
  })
  .then(result=>{
    res.status(200).json(result);
  })
})

//get specific task on database
app.get('/user/:user/:id',(req,res,next)=>{

  Task.findOne({id:req.params.id,user:req.params.user})
  .then(result=>{
    res.status(200).json(result);
  })
})
//delete tasks on database
//:id is a dynamic path segment to identify what to delete
app.delete('/:user/:id',(req,res,next)=>{
  Task.deleteOne({id:req.params.id,user:req.params.user})
  .then(()=>{
    this.userStat[0].deleted = this.userStat[0].deleted+1;
    UserStat.findOneAndUpdate
    ({user:this.userStat[0].user},{deleted:this.userStat[0].deleted})
    .then(()=>{
      res.status(200).json({message:"task Deleted"});
    });
  });

})

//delete only completed Task
app.delete('/:user/task/completed',(req,res,next)=>{
  Task.deleteMany({completed:true,user:req.params.user})
  .then((result)=>{
    this.userStat[0].deleted = this.userStat[0].deleted+result.deletedCount;
    UserStat.findOneAndUpdate
    ({user:this.userStat[0].user},{deleted:this.userStat[0].deleted})
    .then(()=>{
      res.status(200).json({messgae:"cleared completed tasks"});
    })
  })
})

//delete ALL tasks
app.delete('/:user',(req,res,next)=>{
  Task.deleteMany({user:req.params.user})
  .then((result)=>{
    this.userStat[0].deleted = this.userStat[0].deleted+result.deletedCount;
    UserStat.findOneAndUpdate
    ({user:this.userStat[0].user},{deleted:this.userStat[0].deleted})
    .then(()=>{
      res.status(200).json({messgae:"cleared all tasks"});
    })
  })
})

//patch to database to update all completion status
app.patch('/:user/completed',(req,res,next)=>{
  allComplete=req.body.allComplete;
  Task.updateMany({completed:!allComplete,user:req.params.user}
    ,{completed:allComplete})
  .then((result)=>{
    res.status(200).json({message:"many Task Updated"});
  });

})

//update task info
app.patch('/:user/:id',(req,res,next)=>{
  Task.findOneAndUpdate({id:req.params.id,user:req.params.user}
    ,req.body,{new:true},(err,doc)=>{
        res.status(200).json(doc);
    })
})

//get user info
app.get('/admin/users',(req,res,next)=>{
  UserStat.find().then(result=>{
    res.status(200).json(result);
  })
})

module.exports=app;
