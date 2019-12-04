const mongoose= require('mongoose');
const express =require('express');
const Task =require('./models/tasks');
const app= express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1/taskmanager',{useNewUrlParser:true}).then((db)=>{
    console.log("The mongodb is connected sucessfully.");
})

app.get('/tasks',(req,res)=>{
    Task.find().then((task)=>{
        res.json(task);
    })
    
});
app.post('/tasks',(req,res)=>{
    Task.create(req.body)
    .then((task)=>{
        res.json(task);
    })
    .catch((error)=>
    {
        console.log(error);
    })
});

app.delete('/tasks',(req,res)=>{
    Task.deleteMany({})
    .then((status)=>{
    res.json(status);
    });
});
app.get('/tasks/:id',(req,res)=>{
    //res.send("send all task with id "+req.params.id);
    Task.findById(req.params.id)
    .then((task)=>{
        res.json(task);
    })
});

app.put('/tasks/:id',(req,res)=>{
   // res.send("updating  all task with id"+req.params.id);
   Task.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
   .then((task)=>{
       res.json(task);
   })
});
app.delete('/tasks/:id',(req,res)=>{
    //res.send("Deleting  all task with id"+req.params.id);
    Task.findByIdAndDelete(res.params.id)
    .then((task)=>{
        res.json(task);
    });
});

app.listen(3000,()=>{
    console.log("App is running at localhost:3000")
});

app.use((err,req,res,next)=>{
    console.log("Not Supported")
    err.status=405;
    err.json(err.message)
});