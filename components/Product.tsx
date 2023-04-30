import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

interface Props {
  item: FirestoreData;
  user: { uid: string };
}

function Product({ item, user }: Props) {
  const date = new Date(item?.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          mt: "20px",
          gap: "10px",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          cursor: "pointer",
        }}
        onClick={() => {}}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            height: "400px",
            position: "relative",
          }}
        >
          <Image
            src={item.photoUrl || "/images/no-user-image.png"}
            alt=""
            fill
            objectFit="fill"
            style={{ borderRadius: "20px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            ml: "10px",
          }}
        >
          <Typography variant="h6" fontWeight="600">
            {item?.description.toUpperCase()}
          </Typography>
          <Typography variant="body2" fontWeight="600">
            By: {item.user}
          </Typography>
          <Typography variant="caption" fontWeight="600">
            {formattedDate}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Product;
