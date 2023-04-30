import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

function SearchInput() {
  return (
    <Box width={{ xs: "200px", sm: "100%" }} borderRadius="20px">
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "20px",
          },
        }}
        fullWidth
        variant="outlined"
        placeholder="Search..."
      ></TextField>
    </Box>
  );
}

export default SearchInput;
