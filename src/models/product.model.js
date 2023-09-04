const mongoose = require('mongoose');

const productCollection = "products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String }
});

const productModel = mongoose.model(productCollection, productSchema);

module.exports = { productModel };