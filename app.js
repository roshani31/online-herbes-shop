const express=require("express");                                 
const path=require("path");
const app=express(); 
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
//const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/sunday',{useNewUrlParser:true}); 
const port=8000;


//define Mongoose schema
var anjaliSchema=new mongoose.Schema({
    name:String, 
    phone:String,
    email:String,
    address:String,
    desc:String,
    
});

var Collect3=mongoose.model('Collect3', anjaliSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //for serving static file                    
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set('view engine','pug');               //set the template engin as pug                 
app.set('views',path.join(__dirname,'views')); //set the view directory

//END PONINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home1.pug',params);
});

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
});
app.post('/contact', (req,res)=>{
    var myData=new Collect3(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to the database");
    }).catch(()=>{
        res.status(400).send("item was not save in database");
    });
})

//START THE SERVER
   app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`);
});