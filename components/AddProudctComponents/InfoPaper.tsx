import { useAddProductContext } from "@/context/AddProductContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  ListSubheader,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import React, { useState } from "react";

const allCategories = [
  {
    group: "Women",
    options: [
      "Tops",
      "Dresses",
      "Skirts",
      "Pants",
      "Jeans",
      "Jackets",
      "Shoes",
      "Accessories",
    ],
  },
  {
    group: "Men",
    options: [
      "Shirts",
      "T-shirts",
      "Sweaters",
      "Pants",
      "Jeans",
      "Jackets",
      "Shoes",
      "Accessories",
    ],
  },
  {
    group: "Kids",
    options: [
      "Tops",
      "Dresses",
      "Pants",
      "Jeans",
      "Jackets",
      "Shoes",
      "Accessories",
    ],
  },
  {
    group: "Footwear",
    options: ["Women's Shoes", "Men's Shoes", "Kids' Shoes"],
  },
  {
    group: "Accessories",
    options: [
      "Handbags",
      "Backpacks",
      "Watches",
      "Jewelry",
      "Hats",
      "Belts",
      "Sunglasses",
    ],
  },
];

function InfoPaper() {
  const { handleChange, product } = useAddProductContext();

  const categories = allCategories.find(
    (category) => category.group === product.peopleCategory
  );
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
        onChange={(event) => handleChange(event)}
        name="title"
        value={product.title}
        placeholder="Short sleeve t-shirt"
        label="Title"
        variant="outlined"
      />
      <RadioGroup
        aria-label="category-group"
        name="peopleCategory"
        defaultChecked={true}
        value={product.peopleCategory}
        onChange={(event) => handleChange(event)}
        row
        sx={{ ml: "10px" }}
      >
        <FormControlLabel value="Women" control={<Radio />} label="Women" />
        <FormControlLabel value="Men" control={<Radio />} label="Men" />
        <FormControlLabel value="Kids" control={<Radio />} label="Kids" />
      </RadioGroup>
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          label="Category"
          value={product.clothesCategory}
          onChange={(event) => handleChange(event)}
          name="clothesCategory"
        >
          <ListSubheader>{categories?.group}</ListSubheader>
          {categories?.options.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
