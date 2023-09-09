import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        gap: "20px",
        mb: "20px",
      }}
    >
      <Image
        style={{ borderRadius: "50%", objectFit: "scale-down" }}
        width={500}
        height={200}
        src="/images/LogoGrerza.png"
        alt="grerzat"
      />
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Box>
  );
}

export default Loader;
