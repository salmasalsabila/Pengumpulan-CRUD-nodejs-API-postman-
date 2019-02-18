//Create Server

const express = require('express');
const app = express();


app.get('/test', function(request, respone){
    respone.send("salsa")
})

app.listen('12345');