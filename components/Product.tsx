import { DeleteListings } from "@/utils/Listings";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

interface Props {
  item: {
    photoUrl: string;
    name: string;
    user: string;
    size: string;
    category: string;
    userId: string;
    docId: string;
    date: string;
  };
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
  const handleDelete = (id: string) => {
    DeleteListings(id);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "50px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "20px",
          width: "90%",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: { xs: "150px", md: "300px" },
            height: "300px",
            position: "relative",
          }}
        >
          <Image
            src={item.photoUrl || "/images/no-user-image.png"}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">{item.name}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              User: {item.user},
            </Typography>
            <Typography variant="subtitle1">Size: {item.size}</Typography>
          </Box>
          <Typography variant="subtitle1">Category: {item.category}</Typography>
          <Typography variant="h6">{formattedDate}</Typography>
          {item.userId === user?.uid ? (
            <Button
              onClick={() => handleDelete(item.docId)}
              sx={{ marginTop: "20px" }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          ) : null}
        </Box>
      </Box>
    </>
  );
}

export default Product;
