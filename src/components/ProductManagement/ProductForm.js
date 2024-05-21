import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../store/productSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

// Define validation schema using Yup
const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("Price is required"),
  discountPercentage: yup.string().required("Discount Percentage is required"),
  rating: yup.string().required("Rating is required"),
  stock: yup.string().required("Stock is required"),
  thumbnail: yup.string().required("Thumbnail URL is required"),
});

function ProductForm({ product, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    thumbnail: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (product) {
      // If product data exists, pre-fill the form fields
      setFormData(product);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    try {
      // Validate form fields
      validationSchema.validateSync(formData, { abortEarly: false });
      setValidationErrors({});

      if (product) {
        // If product data exists, update the product
        dispatch(updateProduct({ id: product.id, updatedProduct: formData }));
      } else {
        // Otherwise, add a new product
        dispatch(addProduct(formData));
        // Reset form after submission
        setFormData({
          title: "",
          brand: "",
          category: "",
          description: "",
          price: "",
          discountPercentage: "",
          rating: "",
          stock: "",
          thumbnail: "",
        });
      }
      setShowSuccessAlert(true);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Extract validation errors from Yup ValidationError object
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error("Validation error:", error);
      }
    }
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    onClose();
  };

  return (
    <Card>
      {showSuccessAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={handleCloseSuccessAlert}
        >
          Product added successfully!!
        </Alert>
      )}
      <CardContent>
        <Typography variant="h6" component="h2" mb={3}>
          {product ? "Update Product" : "Create Product"}
        </Typography>
        <Grid container spacing={3}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={4} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                margin="normal"
                error={!!validationErrors[key]}
                helperText={validationErrors[key]}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginRight: "5px" }}
          >
            {product ? "Update" : "Create"}
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Close
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductForm;
