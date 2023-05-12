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
        <Typography variant="body2">Description:</Typography>
        <Typography variant="h6">{product.description}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">Color:</Typography>
        <Typography variant="h6">{product.color}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">Size:</Typography>
        <Typography variant="h6">{product.size}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">Price:</Typography>
        <Typography variant="h6" fontWeight="bold">
          {product.price} {product.currency}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">By:</Typography>
        <Typography variant="h6">{product.user}</Typography>
      </Box>
    </Box>
  );
}

export default InfoShow;
