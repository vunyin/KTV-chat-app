const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, ()=>console.log('Server running ....'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

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

})
