import { useAddProductContext } from "@/context/AddProductContext";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";

function AddProductButton() {
  const { handleSubmit, loading, error } = useAddProductContext();
  return (
    <Box>
      <Button onClick={handleSubmit} variant="contained" color="success">
        Add Product
      </Button>
      {error && (
        <Typography variant="body1" fontWeight={600} color="red" mt="10px">
          {error.helperText}
        </Typography>
      )}

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
