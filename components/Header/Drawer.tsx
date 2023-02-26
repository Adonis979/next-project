import { Box, Button, Link, SwipeableDrawer, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";

interface Props {
  setOpenDrawer: any;
  openDrawer: boolean;
}

function Drawer({ setOpenDrawer, openDrawer }: Props) {
  return (
    <>
      <Button
        sx={{
          padding: "0px !important",
        }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{ display: { sm: "flex", md: "none" } }} />
      </Button>
      <SwipeableDrawer
        sx={{ display: { xs: "flex", md: "none" } }}
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <HomeIcon />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                ":hover": { opacity: "0.5", cursor: "pointer" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link
            href="/about"
            style={{
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <InfoIcon />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                ":hover": { opacity: "0.5", cursor: "pointer" },
              }}
            >
              About
            </Typography>
          </Link>
          <Link
            href="/shop"
            style={{
              display: "flex",
              alignItems: "center",
              color: "black",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <ShoppingCartIcon />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                ":hover": { opacity: "0.5", cursor: "pointer" },
              }}
            >
              Shop
            </Typography>
          </Link>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Drawer;
