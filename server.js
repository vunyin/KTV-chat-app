const express = require('express');
const app = express();
const fs = require('fs');


app.listen(process.env.PORT || 5000, ()=>console.log('Server running ....'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));



// read file from json for get data of all users
let datausers =JSON.parse(fs.readFileSync('dataUsers.json'));
// get data all of users and send it to client by using routing /datausers
app.get('/datausers',(req,res)=> {
    res.send(datausers)
});
//create new user that register 
//get value from sign up and send it to client but it send only email
app.post('/newuser',(req,res)=>{
    let isEmail = false;
    for(let user of datausers){
        if(user.email===req.body.email){
            isEmail=true;
        }
    }
    if(!isEmail){
        datausers.push(req.body)
        fs.writeFileSync('dataUsers.json',JSON.stringify(datausers))
    }
    res.send(isEmail)
    
});

// read file message from json and sent it to user
app.get('/text',(req,res)=>{
    let users = JSON.parse(fs.readFileSync('messages.json'));
    res.send(users)
});


//get value of message from client send it to messages.json and write it then send back to client
app.post('/text',(req,res)=>{
    let userName = req.body.username;
    let text = req.body.message;
    let color = req.body.color;
    let time = req.body.time;
    let user={
        username:userName,
        message:text,
        color:color,
        time:time,
        bold:req.body.bold,
        italic:req.body.italic
    }
    let users=[];
    users = JSON.parse(fs.readFileSync('messages.json'));
    users.push(user)
    fs.writeFileSync('messages.json',JSON.stringify(users));
    res.send(users)
})
