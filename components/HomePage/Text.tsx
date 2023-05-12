import { Box, Typography } from "@mui/material";
import React from "react";

function Text() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "100px",
      }}
    >
      <Typography
        sx={{
          width: "100%",
          color: "#0E2F56",
        }}
        variant="h3"
        fontWeight="500"
      >
        LITTLE THINGS MAKES DIFFERENCE
      </Typography>
      <Typography
        sx={{
          color: "black",
          width: { xs: "100%", md: "55%" },
        }}
        fontWeight={700}
        variant="subtitle1"
      >
        Sometimes our stress about things makes it necessary for us to find a
        pleasant spot. Via our attire, you can discover some happiness here.
      </Typography>
    </Box>
  );
}

export default Text;
