import { DeleteListings } from "@/utils/Listings";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface Props {
  item: {
    photoUrl: string;
    name: string;
    user: string;
    size: string;
    category: string;
    userId: string;
    docId: string;
    date: Date;
  };
  user: { uid: string };
}

function Product({ item, user }: Props) {
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
          backgroundColor: "lightcoral",
          padding: "20px",
          width: { xs: "100%", sm: "50%" },
        }}
      >
        <Box sx={{ width: { xs: 120, sm: 300 }, height: { xs: 300, sm: 300 } }}>
          <img
            src={item.photoUrl || "/images/no-user-image.png"}
            alt=""
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
          ></img>
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
      <Typography variant="h6">{item?.date.toLocaleString()}</Typography>
    </>
  );
}

export default Product;
