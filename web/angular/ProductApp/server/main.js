const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

const Product = require('./products')

const app = express()
const port = 4000

// app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://imaneesh:Aneesh@cluster0.j4pwkzi.mongodb.net/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    })
    .catch(err=>{
        console.log("Error in connecting to MongoDB: ",err);
    })

app.post('/api/products',(req, res)=>{
    const newProduct = new Product(req.body);
    newProduct.save()
    .then(product=>{
        res.json(product);
    })
    .catch(err=>{
        res.status(500).json({err:"Error creating product"})
    });
});

app.get('/api/products', (req,res)=>{
    Product.find()
    .then(products=>{
        res.json(products);
    })
    .catch(err =>{
        res.status(500).json({error:"Error detching products"})
    })
})

app.delete('/api/products/:id',(req,res)=>{
    const reqId = req.params.id;
    Product.findOneAndDelete({id:reqId})
    .then(()=>{
        res.json({message:'Product deleted'});
    })
    .catch(err => {
        res.status(500).json({err: 'Error deleting'})
    })
})