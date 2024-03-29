import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@/context/AuthContext";
import Product from "@/components/Product";
import Loader from "@/components/Loader";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import MetaData from "@/components/MetaData";

function Shop() {
  const { user } = useAuth();
  const [items, setItems] = useState<FirestoreData[] | null>(null);
  const handleOpen = () => {
    if (!user) {
      alert("In order to add listing you must login!");
      Router.push("/login");
    } else Router.push("/add-product");
  };

  useEffect(() => {
    const getListing = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_KEY}/product`)
        .then((res) => {
          setItems(res.data);
        });
    };
    getListing();
  }, []);

  const [openProductType, setOpenProductType] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  if (!items) {
    return <Loader />;
  }

  return (
    <>
      <MetaData text="Shop" />
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
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "flex-start" }}
          justifyContent="center"
          gap="30px"
          width="100%"
        >
          <Box
            display={{ xs: "none", md: "flex" }}
            position={{ xs: "relative", md: "sticky" }}
            left="0"
            top={{ xs: "0", md: "10px" }}
            bgcolor="white"
            padding="10px"
            zIndex="1"
            mt="70px"
            width={{ xs: "100%", md: "25%" }}
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
                justifyContent: "space-around",
                flexWrap: "wrap",
                mt: "50px",
                width: { xs: "100%", md: "70%" },
              }}
            >
              {items.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </Box>
          ) : (
            <Loader />
          )}
        </Box>
      </Box>
    </>
  );
}

export default Shop;
