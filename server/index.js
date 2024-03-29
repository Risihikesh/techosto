const fs=require('fs');
const path=require('path');
const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const usersRoutes=require('./routes/users-routes');
const HttpError=require('./models/http-error');
const app=express();

//surpass the warning by setting the current behavior to true//false for using the mongoose current behavior.
mongoose.set('strictQuery', true);

//next is called automatically
app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));

//CORS middleware
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
    next();
});

app.use('/api/users',usersRoutes);

app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route.',404);
    throw error;
});

//error handling 
app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path,(err)=>{
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'An unknown error occurred'});
});


mongoose.connect(`mongodb://127.0.0.1/techosto`).then(()=>{
    app.listen(5000);
    console.log('hello')
}).catch(err=>{
    console.log(err);
});
