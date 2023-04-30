import AddListingModal from "@/components/AddListingModal";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";
import Router from "next/router";
import { useAuth } from "@/context/AuthContext";
import { GetListings } from "@/utils/Listings";
import Product from "@/components/Product";
import Loader from "@/components/Loader";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export interface FirestoreData {
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
      alert("In order to add listing you must login!");
      Router.push("/login");
    } else setOpenAddListingModal(true);
  };

  const [openProductType, setOpenProductType] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openColor, setOpenColor] = useState(false);

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
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
      >
        <Box
          display="flex"
          position={{ xs: "relative", md: "sticky" }}
          left="0"
          top={{ xs: "0", md: "10px" }}
          bgcolor="white"
          padding="10px"
          zIndex="1"
          mt="70px"
          width={{ xs: "100%", md: "40%" }}
          borderRadius="20px"
        >
          <List
            sx={{ bgcolor: "background.paper", width: "100%" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Filter List
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => setOpenProductType(!openProductType)}
            >
              <ListItemText primary="Product Type" />
              {openProductType ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProductType} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>Product Type</ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={() => setOpenSize(!openSize)}>
              <ListItemText primary="Size" />
              {openSize ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSize} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>Size</ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={() => setOpenColor(!openColor)}>
              <ListItemText primary="Color" />
              {openColor ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openColor} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>Color</ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
        {items ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-around",
              padding: "50px 0px 100px 0px",
              gap: "10px",
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
    </Box>
  );
}

export default Shop;
