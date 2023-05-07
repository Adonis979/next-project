import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAddProductContext } from "@/context/AddProductContext";

function SizeColorPaper() {
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
        Size & Color
      </Typography>
      <TextField
        onChange={handleChange}
        name="color"
        value={product.value}
        label="Color"
        fullWidth
        variant="outlined"
        placeholder="Type your product color"
      />
      <FormControl fullWidth>
        <InputLabel>Size</InputLabel>
        <Select
          onChange={handleChange}
          name="size"
          value={product.size}
          label="Size"
        >
          <MenuItem value="Extra Small">Extra Small</MenuItem>
          <MenuItem value="Small">Small</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Large">Large</MenuItem>
          <MenuItem value="Extra Large">Extra Large</MenuItem>
          <MenuItem value="Extra Extra Large">Extra extra Large</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}

export default SizeColorPaper;
