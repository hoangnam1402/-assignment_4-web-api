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

const MONGO_URI=`mongodb+srv://${process.env.dbUserName}:${process.env.dbPw}@cluster0.mbklg.mongodb.net/${process.env.dbName}`;
const connectBD = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connect success');
    } catch (error){
        console.log('Connect fail')
    }
}

connectBD();



app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})