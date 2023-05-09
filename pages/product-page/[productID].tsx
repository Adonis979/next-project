import Loader from "@/components/Loader";
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

function ProductPage() {
  const [product, setProduct] = useState<Product>({
    date: "",
    description: "",
    price: "",
    currency: "",
    color: "",
    docId: "",
    photoUrl: [],
    size: "",
    title: "",
    user: "",
    userId: "",
  });
  const Router = useRouter();
  const productID = Router.query.productID;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getListingById(productID);
    // @ts-ignore
    setProduct(data);
  };

  if (product.date === "") {
    return <Loader />;
  }
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

export default ProductPage;
