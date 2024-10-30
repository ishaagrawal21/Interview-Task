import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "../../Components/Card";
import apiHelper from "../../Common/ApiHelper";
export default function Product() {
  const [Product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const product = await apiHelper.getProduct();

      if (product.data && product.data) {
        setProduct(product.data);
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
        return;
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Grid container mt={3}>
      {Product.map((item, index) => {
        return (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            sx={{ padding: "1rem", display: "flex", justifyContent: "center" }}
          >
            <MediaCard
              name={item.name}
              price={item.price}
              description={item.description}
              id={item.id}
              imgUrl={
                "https://img.freepik.com/premium-photo/man-wearing-plaid-shirt-stands-front-window_1313274-13213.jpg?semt=ais_hybrid"
              }
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
