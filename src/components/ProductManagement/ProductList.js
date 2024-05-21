import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../store/productSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, Modal } from "@mui/material";
import ProductForm from "./ProductForm";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../custom/ConfirmationDialog";
import { useFetchProducts } from "../../hooks/useFetchProducts";

function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const fetchProducts = useFetchProducts();

  useEffect(() => {
    if (products.products.length === 0) {
      fetchProducts();
    }
  }, []);

  const handleView = (product) => {
    setSelectedProduct(product);
    setCreateMode(false);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setCreateMode(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setCreateMode(false);
  };

  const handleShowDeleteConfirmation = (id) => {
    setDeleteProductId(id);
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = () => {
    if (deleteProductId) {
      dispatch(removeProduct(deleteProductId));
      setShowDeleteConfirmation(false); // Close the confirmation dialog
    }
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <>
          <EditNoteIcon onClick={() => handleView(params.row)} style={{cursor:'pointer'}} color="primary"/>
          <DeleteIcon
            onClick={() => handleShowDeleteConfirmation(params.row.id)}
            style={{cursor:'pointer'}}
            color="error"
          />
        </>
      ),
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "discountPercentage", headerName: "Discount %", width: 150 },
    { field: "rating", headerName: "Rating", width: 120 },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.thumbnail}
          alt={params.row.title}
          style={{ width: "50px", border: "1px solid #ccc" }}
        />
      ),
    }
  ];

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Product Listing</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProduct}
        >
          Create Product
        </Button>
      </div>

      <div
        style={{
          width: "90%",
          maxWidth: "100%",
          flex: "1 1 auto",
          overflowY: "auto",
        }}
      >
        <DataGrid
          rows={products.products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          style={{ width: "100%" }}
        />
      </div>

      <Modal
        open={!!selectedProduct || createMode}
        onClose={handleCloseModal}
        hideBackdrop={false}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProductForm
            product={selectedProduct}
            createMode={createMode}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>

      <ConfirmationDialog
        open={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={handleDelete}
        productId={deleteProductId}
      />
    </div>
  );
}

export default ProductList;
