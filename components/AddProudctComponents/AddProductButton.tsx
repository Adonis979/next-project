import { useAddProductContext } from "@/context/AddProductContext";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import React from "react";

function AddProductButton() {
  const { handleSubmit, loading } = useAddProductContext();
  return (
    <Box>
      <Button onClick={handleSubmit} variant="contained" color="success">
        Add Product
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default AddProductButton;
