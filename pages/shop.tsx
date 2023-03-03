import AddListingModal from "@/components/AddListingModal";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@/context/AuthContext";
import { GetListings } from "@/utils/Listings";
import Product from "@/components/Product";
import Loader from "@/components/Loader";

interface FirestoreData {
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  user: string;
  size: string;
  userId: string;
  date: string;
  docId: string;
}

interface MyComponentProps {
  items: FirestoreData[];
}

export async function getServerSideProps() {
  const data = await GetListings();
  return {
    props: {
      items: data,
      revalidate: 600,
    },
  };
}

function Shop({ items }: MyComponentProps) {
  const { user } = useAuth();
  const [openAddListingModal, setOpenAddListingModal] = useState(false);
  const handleOpen = () => {
    if (!user) {
      Router.push("/login");
    } else setOpenAddListingModal(true);
  };

  return (
    <Box
      sx={{
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFF6F6",
      }}
    >
      <Button onClick={handleOpen} variant="contained">
        Add listing
      </Button>
      <AddListingModal
        open={openAddListingModal}
        handleClose={() => setOpenAddListingModal(false)}
      />
      {items ? (
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
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default Shop;
