const express = require('express');
const os = require('os');

const app = express();
const port = 80;
const colour = 'blue';
const hostName = os.hostname();

app.get('/',(req,res)=>{
    res.send(`<h1 style="color:${colour};">Hello from color app</h1>
    <h2>From hostname ${hostName}</h2>`);
});

app.get('/api',(req,res)=>{
    //const {format} = req.query;
    const format = req.query.format;
    if(format=="json"){
        res.send({
            "color":colour,
            "hostName":hostName
        });
    }
    else{
        res.send(
            `color is ${colour}, hostName is ${hostName}`
        );
    }
    
});


app.listen(port,()=>{
    console.log(`Hey Color App listening at port ${port}`)
});