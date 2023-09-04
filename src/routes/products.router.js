const { Router } = require('express');
const { productModel } = require('../models/product.model');

const router = Router();

router.get('/', async (req, res) => {
  try {
    let products = await productModel.find();
    res.send({ result: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error", message: "Internal server error" });
  }
});

router.post('/', async (req, res) => {
  let { name, price, category, stock, image } = req.body;

  if (!name || !price || !description) {
    res.status(400).send({ result: "error", message: "Missing body params" });
    return;
  }

  try {
    let result = await productModel.create({ name, price, category, stock, image });
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error", message: "Internal server error" });
  }
});

router.put('/:productId', async (req, res) => {
  let { productId } = req.params;
  let productToUpdate = req.body;

  if (!productToUpdate.name || !productToUpdate.price || !productToUpdate.category || !productToUpdate.stock) {
    res.status(400).send({ result: "error", message: "Missing body params" });
    return;
  }

  try {
    let result = await productModel.findByIdAndUpdate(productId, productToUpdate, { new: true });
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error", message: "Internal server error" });
  }
});

router.delete('/:productId', async (req, res) => {
  let { productId } = req.params;

  try {
    let result = await productModel.findByIdAndDelete(productId);
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "error", message: "Internal server error" });
  }
});

module.exports = router;
