import AddListingModal from "@/components/AddListingModal";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@/context/AuthContext";
import { GetListings } from "@/utils/Listings";
import Product from "@/components/Product";
import Layout from "@/components/Layout";

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

  return (
    <Layout>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", sm: "60%" },
          }}
        >
          {items.map((item, index) => (
            <Product item={item} user={user} key={index} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export default Shop;
