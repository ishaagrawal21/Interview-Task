import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import apiHelper from "../Common/ApiHelper";

export default function MediaCard(props) {
  const { name, price, description, imgUrl, id } = props;
  const getProduct = async () => {
    try {
      const product = await apiHelper.getProduct();
      if (product) window.location.reload();
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
  const deleteProduct = async (id) => {
    try {
      const Confirm = window.confirm("Are you sure to delete this product");
      if (!Confirm) return;

      // eslint-disable-next-line
      const result = await apiHelper.deleteProduct(id);

      if (result) getProduct();
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return;
      }
    }
  };

  return (
    <Card sx={{ Width: 145 }}>
      <CardMedia sx={{ height: 340 }} image={imgUrl} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product Name : {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Description: {description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" mt={2}>
          Price: {price}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          QTY: 1
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">UPDATE</Button>
        <Button onClick={() => deleteProduct(id)} size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
