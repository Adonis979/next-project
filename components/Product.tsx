import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  item: FirestoreData;
  button?: any;
}

function Product({ item, button }: Props) {
  const Router = useRouter();
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
          width: { xs: "100%", md: "30%" },
          height: "500px",
          mt: "20px",
          gap: "10px",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: { xs: "none", md: "scale(1.03)" },
          },
          "&:active": {
            transform: { xs: "scale(0.98)", md: "scale(1)" },
            transition: "transform 0.3s ease",
            backgroundColor: { xs: "white", md: "lightblue" },
            borderRadius: "20px",
          },
        }}
        onClick={() => Router.push(`/product-page/${item.docId}`)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            borderRadius: "20px",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={item.photoUrl[0] || "/images/no-user-image.png"}
            alt=""
            fill
            objectFit="cover"
            style={{ borderRadius: "20px" }}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="95%"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              ml: "10px",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {item?.title.toUpperCase()}
            </Typography>
            <Typography variant="body2">By: {item.user}</Typography>
            <Typography variant="caption">{formattedDate}</Typography>
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            width="30%"
            sx={{ textAlign: "right" }}
          >
            {item?.price} {item?.currency}
          </Typography>
        </Box>
        {button}
      </Box>
    </>
  );
}

export default Product;
