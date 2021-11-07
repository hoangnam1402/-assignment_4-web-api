const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/',(req, res) =>{
    res.send('Welcome');
})

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})