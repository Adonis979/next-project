import { useAddProductContext } from "@/context/AddProductContext";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "Light Black", hex: "#333333" },
  { name: "Dark Charcoal", hex: "#222222" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Light Gray", hex: "#B3B3B3" },
  { name: "Gray", hex: "#808080" },
  { name: "Dark Gray", hex: "#666666" },
  { name: "Red", hex: "#FF0000" },
  { name: "Pale Red", hex: "#FFCCCC" },
  { name: "Dark Red", hex: "#990000" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Green", hex: "#008000" },
  { name: "Dark Green", hex: "#006600" },
  { name: "Pale Green", hex: "#CCFFCC" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Light Blue", hex: "#66B2FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Purple", hex: "#800080" },
  { name: "Pale Purple", hex: "#D9B3FF" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Pale Pink", hex: "#FFD9EC" },
  { name: "Dark Pink", hex: "#CC0066" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Light Brown", hex: "#D2B48C" },
  { name: "Dark Brown", hex: "#663300" },
  { name: "Khaki", hex: "#C3B091" },
  { name: "Light Khaki", hex: "#E6D5B8" },
  { name: "Dark Khaki", hex: "#86744D" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Light Beige", hex: "#FAF0E6" },
  { name: "Dark Beige", hex: "#A67C00" },
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
        <IconButton key={index} onClick={() => handleClick(color.hex)}>
          <Box
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
              bgcolor={color.hex}
            />
          </Box>
        </IconButton>
      ))}
    </Box>
  );
}

export default ColorPicker;
