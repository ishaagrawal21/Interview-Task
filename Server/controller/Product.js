const Product = require("../model/Product");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, price, quantity } = req.body;
    if (!name) return res.status(400).send({ message: "name is required" });
    if (!description)
      return res.status(400).send({ message: "description is required" });
    if (!imageUrl)
      return res.status(400).send({ message: "imageUrl is required" });
    if (!price) return res.status(500).send({ message: "price is required" });
    if (!quantity)
      return res.status(400).send({ message: "quantity is required" });

    const product = await Product.create({
      name,
      description,
      imageUrl,
      price,
      quantity,
    });
    res.status(200).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal servar Error" });
  }
};
