import { Box, Typography } from "@mui/material";
import React from "react";

function Text() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography
        sx={{ fontSize: "97px", fontFamily: "Dosis", color: "#0E2F56" }}
        variant="h1"
      >
        LITTLE THINGS MAKES DIFFERENCE
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontSize: "15px",
          color: "#FB3B2D",
          width: "55%",
        }}
        variant="subtitle1"
      >
        Sometimes our stress about things makes it necessary for us to find a
        pleasant spot. Via our attire, you can discover some happiness here.
      </Typography>
    </Box>
  );
}

export default Text;
