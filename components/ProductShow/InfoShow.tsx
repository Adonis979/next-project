import { Product } from "@/pages/product-page/[productID]";
import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  product: Product;
}

function InfoShow({ product }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      padding={{ xs: "20px", md: "0px" }}
    >
      <Box>
        <Typography variant="body2" fontFamily="Montserrat">
          Description:
        </Typography>
        <Typography variant="h6" fontFamily="Montserrat">
          {product.description}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" fontFamily="Montserrat">
          Color:
        </Typography>
        <Typography variant="h6" fontFamily="Montserrat">
          {product.color}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" fontFamily="Montserrat">
          Size:
        </Typography>
        <Typography variant="h6" fontFamily="Montserrat">
          {product.size}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" fontFamily="Montserrat">
          Price:
        </Typography>
        <Typography variant="h6" fontFamily="Montserrat" fontWeight="bold">
          {product.price} {product.currency}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" fontFamily="Montserrat">
          By:
        </Typography>
        <Typography variant="h6" fontFamily="Montserrat">
          {product.user}
        </Typography>
      </Box>
    </Box>
  );
}

export default InfoShow;
