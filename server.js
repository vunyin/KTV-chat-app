const express = require('express');
const app = express();
const fs = require('fs');
let datausers=[]
datausers =(JSON.parse(fs.readFileSync('dataUsers.json')));
fs.writeFileSync('dataUsers.json',JSON.stringify(datausers));

app.listen(process.env.PORT || 5000, ()=>console.log('Server running ....'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

let users=[
    {username:'thy',message:'welcome!!',color:'color-default'}
];


// let icons = [
//     {id: 1, icon: '😓', sign: '):'},
//     {id: 2, icon: '😄', sign: '(:'},
//     {id: 3, icon: '😭', sign: 'cry'},
//     {id: 4, icon: '🥰', sign: 'love'},
//     {id: 5, icon: '😷', sign: 'sick'},
//     {id: 6, icon: '😲', sign: 'wow'},
//     {id: 7, icon: '😤', sign: 'bore'},
//     {id: 8, icon: '🥱', sign: 'sleep'},
//     {id: 9, icon: '😋', sign: 'haha'},
//     {id: 10, icon: '🤬', sign: 'angry'},
// ]

// app.get('/emoji', (req, res) => res.send(icons));

app.get('/datausers',(req,res)=>res.send(datausers));



app.get('/text',(req,res)=>res.send(users));

app.post('/text',(req,res)=>{
    let userName = req.body.username;
    let text = req.body.message;
    let color = req.body.color;
    let user={
        username:userName,
        message:text,
        color:color
    }
    console.log(user)
    users.push(user);
    res.send(users)
})
