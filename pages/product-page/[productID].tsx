import InfoShow from "@/components/ProductShow/InfoShow";
import PhotoShow from "@/components/ProductShow/PhotoShow";
import { getListingById } from "@/utils/Listings";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface Product {
  date: string;
  description: string;
  price: string;
  currency: string;
  color: string;
  docId: string;
  photoUrl: string[];
  size: string;
  title: string;
  user: string;
  userId: string;
}

function ProductPage({ product }: any) {
  const Router = useRouter();
  const productID = Router.query.productID;

  console.log(product);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: "50px 0px 50px 0px",
        gap: "30px",
      }}
    >
      {/* Left hand side */}
      <Box display="flex" width={{ xs: "100%", md: "60%" }}>
        <PhotoShow product={product} />
      </Box>
      {/* Right hand side */}
      <Box display="flex" width={{ xs: "100%", md: "40%" }}>
        <InfoShow product={product} />
      </Box>
    </Container>
  );
}

export async function getServerSideProps({ query }: any) {
  const productID = query.productID;

  try {
    const product = await getListingById(productID);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default ProductPage;
