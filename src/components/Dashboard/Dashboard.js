import React, { useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import Graph from "./Graph";
import { useFetchProducts } from "../../hooks/useFetchProducts";

const Dashboard = () => {
  const products = useSelector((state) => state.products);
  const fetchProducts = useFetchProducts();

  useEffect(() => {
    if (products.products.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Graph Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          This graph represents the average price of products in each category.
          Each category is represented by a slice in the pie chart, and the size
          of each slice corresponds to the average price of products belonging
          to that category.
        </Typography>
        <Graph />
      </Paper>
    </Container>
  );
};

export default Dashboard;
