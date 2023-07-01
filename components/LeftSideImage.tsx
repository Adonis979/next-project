import { Box, Grid } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function LeftSideImage() {
  const Router = useRouter();
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        height: { xs: "50vh", md: "100vh" },
      }}
    >
      <Box height="100%" width="100%" position="relative">
        <Image
          layout="fill"
          objectFit="cover"
          alt="grerza"
          src="/images/layout-2.png"
        ></Image>
      </Box>
      <Image
        onClick={() => Router.push("/")}
        width={200}
        height={35}
        style={{
          position: "absolute",
          top: "66px",
          left: "38px",
          cursor: "pointer",
        }}
        alt="grerzat"
        src="/images/grerza-white.png"
      />
    </Grid>
  );
}

export default LeftSideImage;
