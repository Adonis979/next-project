import { useAddProductContext } from "@/context/AddProductContext";
import { Paper, TextField, Typography } from "@mui/material";
import React from "react";
import Product from "../Product";

function InfoPaper() {
  const { handleChange, product } = useAddProductContext();
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        padding: "20px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "20px",
      }}
    >
      <Typography
        ml="10px"
        variant="body1"
        fontWeight="500px"
        fontFamily="Montserrat"
      >
        Info
      </Typography>
      <TextField
        onChange={handleChange}
        name="title"
        value={product.title}
        placeholder="Short sleeve t-shirt"
        label="Title"
        variant="outlined"
      />
      <TextField
        onChange={handleChange}
        name="description"
        value={product.description}
        label="Description"
        placeholder="Type some details for your product"
        multiline
        rows={4}
        variant="outlined"
      />
    </Paper>
  );
}

export default InfoPaper;
