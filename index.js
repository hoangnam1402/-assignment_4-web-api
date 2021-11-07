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

const MONGO_URI=`mongodb+srv://admin:1@cluster0.mbklg.mongodb.net/lab4`;
const connectBD = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connect success');
    } catch (error){
        console.log('Connect fail')
    }
}

connectBD();

const ProductsSchema = new Schema({
    name: { type: String },
    type: { type: String },
    price: { type: Number },
})

const productMode = mongoose.model('products', ProductsSchema)

app.get('/products', async (req, res) => {
    try {
        const products = await productMode.find({});
        res.status(200).json({ products: products });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error"})
    }
})

app.post('/products', async (req, res) => {
    try {
        const { name, type, price} = req.body;
        const newP = new productMode({
            name: name, 
            type: type, 
            price: price, 
        });
        await newP.save();
        res.status(201).json({ success: true, message: "saved", newP });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
});

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})