import AddListingModal from "@/components/AddListingModal";
import { db } from "@/firebase";
import { Box, Button, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@/context/AuthContext";

interface FirestoreData {
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  user: string;
  size: string;
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
    },
  ]);
  const handleOpen = () => {
    if (!user) {
      Router.push("/login");
    } else setOpenAddListingModal(true);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "items"), orderBy("date", "desc")), // add orderBy query
      (querySnapshot) => {
        const data: FirestoreData[] = querySnapshot.docs.map(
          (doc) => doc.data() as FirestoreData
        );
        setItems(data);
        console.log(data);
      }
    );

    return () => unsubscribe();
  }, []);
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
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "70px",
            marginTop: "50px",
            backgroundColor: "lightcoral",
            padding: "20px",
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Box
            sx={{ width: { xs: 120, sm: 300 }, height: { xs: 300, sm: 300 } }}
          >
            <img
              src={item.photoUrl || "/images/no-user-image.png"}
              alt=""
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
            ></img>
          </Box>
          <Box>
            <Typography variant="h5">{item.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                User: {item.user},
              </Typography>
              <Typography variant="subtitle1">Size: {item.size}</Typography>
            </Box>
            <Typography variant="subtitle1">
              Category: {item.category}
            </Typography>
            <Typography variant="subtitle1">Date: </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Shop;
