import Product from "../models/poduct";

export const createProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    const product = await Product.create({
      name,
      price,
      image: req.file.filename,
      description
    });

    res.status(201).json({
      product,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );

    res.status(201).json({
      product,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}