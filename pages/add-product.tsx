import { Box, Button, Typography } from "@mui/material";
import React from "react";
import InfoPaper from "@/components/AddProudctComponents/InfoPaper";
import MediaPaper from "@/components/AddProudctComponents/MediaPaper";
import SizeColorPaper from "@/components/AddProudctComponents/SizeColorPaper";
import PricePaper from "@/components/AddProudctComponents/PricePaper";
import { AddProductContextProvider } from "@/context/AddProductContext";
import AddProductButton from "@/components/AddProudctComponents/AddProductButton";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

function AddProduct() {
  const { user } = useAuth();
  const Router = useRouter();

  if (!user) {
    Router.push("/login");
    return <Loader />;
  }

  return (
    <AddProductContextProvider>
      <Box
        display="flex"
        justifyContent={{ xs: "flex-start", md: "center" }}
        flexWrap="wrap"
        padding="10px"
        gap={{ xs: "0px", lg: "20px" }}
        bgcolor="#FFF6F6"
      >
        <Box
          display="flex"
          padding="20px"
          flexDirection="column"
          alignItems="center"
          gap="20px"
          width={{ xs: "100%", lg: "45%" }}
        >
          <Typography
            variant="h6"
            marginLeft="10px"
            fontWeight="500px"
            fontFamily="Montserrat"
          >
            Add Product
          </Typography>
          <InfoPaper />
          <MediaPaper />
        </Box>
        <Box
          display="flex"
          position={{ xs: "relative", md: "sticky" }}
          left="0"
          top="0"
          padding="20px"
          flexDirection="column"
          alignItems="center"
          gap="20px"
          width={{ xs: "100%", lg: "25%" }}
          mt={{ xs: "0px", lg: "52px" }}
        >
          <SizeColorPaper />
          <PricePaper />
          <AddProductButton />
        </Box>
      </Box>
    </AddProductContextProvider>
  );
}

export default AddProduct;
