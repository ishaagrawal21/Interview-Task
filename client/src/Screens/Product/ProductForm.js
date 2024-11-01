import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Product Name is required",
    "string.min": "Product Name should have at least 3 characters",
  }),
  description: Joi.string().min(5).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description should have at least 5 characters",
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price should be at least 1",
  }),
  imageUrl: Joi.string().uri().required().messages({
    "string.empty": "Image URL is required",
    "string.uri": "Image URL must be a valid URL",
  }),
});

function ProductForm({ open, onClose, onSave, initialData }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    } else {
      setProduct({ name: "", description: "", price: "", imageUrl: "" });
    }
  }, [initialData]);

  const validate = (fieldData) => {
    const { error } = schema.validate(fieldData, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (!error) return {};
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const validationErrors = validate(product);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave(product);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initialData ? "Update Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Name"
          name="name"
          fullWidth
          value={product.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          fullWidth
          value={product.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          fullWidth
          type="number"
          value={product.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          margin="dense"
          label="Image URL"
          name="imageUrl"
          fullWidth
          value={product.imageUrl}
          onChange={handleChange}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          {initialData === null ? "Save" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductForm;
