import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

interface Props {
  product: FirestoreData;
}

function InfoShow({ product }: Props) {
  console.log(product, "product");
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      padding={{ xs: "20px", md: "0px" }}
    >
      <Box>
        <Typography variant="body2">Description:</Typography>
        <Typography variant="subtitle1" fontWeight="500">
          {product?.description}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">Color:</Typography>
        <Box
          width="20px"
          height="20px"
          borderRadius="50%"
          bgcolor={product?.color}
          mt="5px"
        />
      </Box>
      <Box>
        <Typography variant="body2">Size:</Typography>
        <Typography variant="subtitle1" fontWeight="500">
          {product?.size}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">Price:</Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {product?.price} {product?.currency}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">By:</Typography>
        <Typography variant="subtitle1" fontWeight="600">
          {product.publisher?.username}
        </Typography>
        <Image
          style={{ borderRadius: "20px", objectFit: "fill" }}
          src={product.publisher.profilePicture}
          width={190}
          height={150}
          alt="profile"
        />
      </Box>
    </Box>
  );
}

export default InfoShow;
