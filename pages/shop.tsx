import AddListingModal from "@/components/AddListingModal";
import { db } from "@/firebase";
import { Box, Button, Typography } from "@mui/material";
import { collection, Firestore, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FirestoreData {
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  user: string;
  size: string;
}

function Shop() {
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

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const data: FirestoreData[] = querySnapshot.docs.map(
        (doc) => doc.data() as FirestoreData
      );
      setItems(data);
    };
    getData();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={() => setOpenAddListingModal(true)} variant="contained">
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
          }}
        >
          <Image
            src={item.photoUrl}
            loader={() => item.photoUrl || "/images/no-user-image.png"}
            alt=""
            width={110}
            height={110}
          ></Image>
          <Box>
            <Typography variant="h3">{item.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                User: {item.user},
              </Typography>
              <Typography variant="subtitle1">Size: {item.size}</Typography>
            </Box>
            <Typography variant="subtitle1">
              Category: {item.category}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Shop;
