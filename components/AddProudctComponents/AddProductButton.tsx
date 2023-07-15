import { useAddProductContext } from "@/context/AddProductContext";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReplyModal from "./ReplyModal";

function AddProductButton() {
  const { handleSubmit, loading, error } = useAddProductContext();
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (error !== null) {
      if (!error.error) {
        setOpenModal(true);
        setText(
          "Your listing has been successfully added to our shop. Please check the shop for your product. Thank you!"
        );
      } else {
        setOpenModal(true);
        setText(error.helperText);
      }
    }
  }, [error]);
  return (
    <Box>
      <Button onClick={handleSubmit} variant="contained" color="success">
        Add Product
      </Button>
      <ReplyModal
        handleClose={() => setOpenModal(false)}
        open={openModal}
        text={text}
        error={error}
      />
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
