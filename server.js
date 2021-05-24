const express = require('express');
const app = express();
const fs = require('fs');
let dataUsers =(JSON.parse(fs.readFileSync('dataUsers.json')));

app.listen(process.env.PORT || 5000, ()=>console.log('Server running ....'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

let users=[
    {username:'thy',message:'welcome!!'}
];

app.get('/text',(req,res)=>res.send(users));

app.post('/text',(req,res)=>{
    let userName = req.body.username;
    let text = req.body.message;
    let user={
        username:userName,
        message:text
    }
    users.push(user);
    res.send(users)
})
