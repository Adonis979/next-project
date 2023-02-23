import AddListingModal from "@/components/AddListingModal";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@/context/AuthContext";
import { DeleteListings, GetListings } from "@/utils/Listings";
import Product from "@/components/Product";

interface FirestoreData {
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  user: string;
  size: string;
  userId: string;
  date: Date;
  docId: string;
}

function Shop() {
  const { user } = useAuth();
  const [openAddListingModal, setOpenAddListingModal] = useState(false);
  const [items, setItems] = useState<FirestoreData[]>([
    {
      name: "",
      category: "",
      description: "",
      photoUrl: "",
      user: "",
      size: "",
      userId: "",
      date: new Date(0),
      docId: "",
    },
  ]);
  const handleOpen = () => {
    if (!user) {
      Router.push("/login");
    } else setOpenAddListingModal(true);
  };

  useEffect(() => {
    GetListings(setItems);
  }, []);

  const handleDeleteListing = async (id: string) => {
    DeleteListings(id);
  };
  return (
    <Box
      sx={{
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={handleOpen} variant="contained">
        Add listing
      </Button>
      <AddListingModal
        open={openAddListingModal}
        handleClose={() => setOpenAddListingModal(false)}
      />
      {items.map((item, index) => (
        <Product
          handleDeleteListing={() => handleDeleteListing(item.docId)}
          item={item}
          user={user}
          key={index}
        />
      ))}
    </Box>
  );
}

export default Shop;
