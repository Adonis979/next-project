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
        height: "100vh",
        gap: "20px",
      }}
    >
      <Image
        style={{ borderRadius: "50%" }}
        width={200}
        height={200}
        src="/images/grerzat.png"
        alt="grerzat"
      />
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Box>
  );
}

export default Loader;
