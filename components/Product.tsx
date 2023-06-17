import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";

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
          padding: "5px",
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
        onClick={() => Router.push(`/product-page/${item._id}`)}
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
          {item.publisher?.userType.type === "business" &&
            item.publisher?.userType.isVerified === "3" && (
              <Box
                position="absolute"
                top={-15}
                left={-10}
                zIndex={99}
                display="flex"
                alignItems="center"
                bgcolor="#fff"
                padding="5px"
                borderRadius="10px"
                border="1px solid green"
              >
                <VerifiedIcon color="success" />
                <Typography variant="caption" color="green" fontWeight={600}>
                  Verified seller
                </Typography>
              </Box>
            )}
          {item.publisher?.userType.type === "business" && (
            <Box
              position="absolute"
              top={-25}
              right={-15}
              zIndex={99}
              width="70px"
              height="70px"
              bgcolor="#fff"
              borderRadius="50%"
            >
              <Image
                fill
                src={
                  item.publisher.profilePicture || "/images/no-user-image.png"
                }
                alt=""
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </Box>
          )}
          <Image
            src={item.photos[0] || "/images/no-user-image.png"}
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
          padding="9px"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item?.title.toUpperCase()}
            </Typography>
            <Typography fontSize="10px">{formattedDate}</Typography>
          </Box>
          <Typography
            variant="body2"
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
