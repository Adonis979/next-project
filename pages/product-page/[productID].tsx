import Loader from "@/components/Loader";
import InfoShow from "@/components/ProductShow/InfoShow";
import PhotoShow from "@/components/ProductShow/PhotoShow";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProductPage() {
  const [product, setProduct] = useState<FirestoreData | null>(null);
  const Router = useRouter();

  const { productID } = Router.query;

  useEffect(() => {
    if (productID) {
      // Only fetch data if the productID is available
      getData();
    }
  }, [productID]);

  const getData = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/product/${productID}`)
        .then((res) => {
          setProduct(res.data.product);
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
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
