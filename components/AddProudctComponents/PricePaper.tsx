import { useAddProductContext } from "@/context/AddProductContext";
import { Box, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React from "react";

function PricePaper() {
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
        Price
      </Typography>
      <Box display="flex" gap="20px">
        <TextField
          onChange={handleChange}
          name="price"
          value={product.price}
          type="number"
          sx={{ width: { xs: "60%", lg: "70%" } }}
          label="Price"
          placeholder="Put the price of your product here"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          name="currency"
          value={product.currency}
          sx={{ width: { xs: "40%", lg: "30%" } }}
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
        >
          <MenuItem value="EUR">Euro €</MenuItem>
          <MenuItem value="DOLLAR">Dollar $</MenuItem>
        </TextField>
      </Box>
    </Paper>
  );
}

export default PricePaper;
