import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "../../Components/Card";
import apiHelper from "../../Common/ApiHelper";
import { useNavigate } from "react-router-dom";
import Path from "../../Common/Path";
import { Box, Button, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "./ProductForm";

export default function Product({ Auth }) {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await apiHelper.getProduct();
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) alert(message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Auth) {
      navigate(Path.login);
    } else {
      getProduct();
    }
  }, [Auth]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (product) => {
    try {
      if (editingProduct?.id) {
        const response = await apiHelper.updateProduct(
          { ...product, quantity: 1 },
          editingProduct.id
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? response.data : p))
        );
        toast.success("Product updated successfully!");
      } else {
        const response = await apiHelper.addProduct({
          ...product,
          quantity: 1,
        });

        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");
      }
      handleDialogClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await apiHelper.deleteProduct(productId);
      if (response.status === 200) {
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product:", error);
    }
  };
  return (
    <Box>
      <ToastContainer />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Typography mt={2} variant="h5">
          Product List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Grid>
      <Grid container>
        {products.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            sx={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <MediaCard
              name={item.name}
              price={item.price}
              description={item.description}
              id={item.id}
              imgUrl={item.imageUrl}
              onEdit={() => handleEditProduct(item)}
              onDelete={() => handleDeleteProduct(item.id)}
            />
          </Grid>
        ))}
      </Grid>

      <ProductForm
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </Box>
  );
}
