import { useAddProductContext } from "@/context/AddProductContext";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Charcoal", hex: "#36454F" },
];

function ColorPicker() {
  const { handleClick, product } = useAddProductContext();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexWrap="wrap"
      padding="10px"
    >
      {colors.map((color, index) => (
        <IconButton onClick={() => handleClick(color.hex)}>
          <Box
            key={index}
            padding="2px"
            border={
              color.hex === product.color ? "2px solid blue" : "2px solid white"
            }
            borderRadius="50%"
          >
            <Box
              key={index}
              sx={{ cursor: "pointer" }}
              height="20px"
              width="20px"
              borderRadius="50%"
              bgcolor={color.name}
            />
          </Box>
        </IconButton>
      ))}
    </Box>
  );
}

export default ColorPicker;
