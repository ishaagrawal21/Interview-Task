import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  const { name, price, description, imgUrl, id, onEdit, onDelete } = props;

  const deleteProduct = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await onDelete();
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) alert(message);
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Card sx={{ Width: 145 }}>
      <CardMedia sx={{ height: 340 }} image={imgUrl} title="Product Image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product Name: {name}
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
        <Button
          size="small"
          onClick={() => onEdit({ id, name, description, price, imgUrl })}
        >
          UPDATE
        </Button>
        <Button size="small" onClick={deleteProduct}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
