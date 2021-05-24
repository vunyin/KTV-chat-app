const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, ()=>console.log('Server running ....'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

<<<<<<< HEAD
// app.get('/text',(req,res) =>res.send('Hello project'));

let Message = {
    text: "hello world",
}





app.post('/text', (req, res)=>{
    let text = req.body;
    Message = text ;
    res.send(text)
    
})

app.get('/text', (req, res)=>{
    res.send(Message)
=======
let users=[
    {username:'thy',message:'welcome!!'}
];

app.get('/text',(req,res)=>res.send(users));
>>>>>>> 804408425a9a04e9b581493cb45336a28b9c2e8e

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
