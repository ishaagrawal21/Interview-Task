const express = require("express");
const router = express.Router();
const userController = require("../Server/controller/User");
const productController = require("../Server/controller/Product");
const auth = require("../Server/middleware/Auth");

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.post("/products", auth, productController.addProduct);
router.get("/products", auth, productController.getAllProducts);

module.exports = router;
