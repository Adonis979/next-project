import { Box, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#00004d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h3" sx={{ color: "white" }}>
        Made by Adonis
      </Typography>
    </Box>
  );
}

export default Footer;
