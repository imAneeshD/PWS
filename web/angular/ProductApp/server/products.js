const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number
});

const Products=mongoose.model('Product', productSchema);

module.exports=Products;