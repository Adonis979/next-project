import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import React from "react";
import SearchInput from "./SearchInput";
import ProjectLink from "../ProjectLink";
import { useRouter } from "next/router";
import ContactPageIcon from "@mui/icons-material/ContactPage";

interface Props {
  setOpenDrawer: any;
  openDrawer: boolean;
}

function Drawer({ setOpenDrawer, openDrawer }: Props) {
  const Router = useRouter();
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
          <SearchInput />
          <Box
            onClick={() => {
              Router.push("/");
              setOpenDrawer(false);
            }}
            display="flex"
            alignItems="center"
            color="#272727"
            sx={{
              ":active": {
                backgroundColor: "lightblue",
                borderRadius: "10px",
              },
              padding: "5px",
            }}
          >
            <HomeIcon color="info" />
            <ProjectLink text="HOME" to="/" />
          </Box>
          <Box
            onClick={() => {
              Router.push("/about");
              setOpenDrawer(false);
            }}
            display="flex"
            alignItems="center"
            color="#272727"
            sx={{
              ":active": {
                backgroundColor: "lightblue",
                borderRadius: "10px",
              },
              padding: "5px",
            }}
          >
            <InfoIcon color="info" />
            <ProjectLink text="ABOUT" to="/about" />
          </Box>
          <Box
            onClick={() => {
              Router.push("/shop");
              setOpenDrawer(false);
            }}
            display="flex"
            alignItems="center"
            sx={{
              ":active": {
                backgroundColor: "lightblue",
                borderRadius: "10px",
              },
              padding: "5px",
            }}
          >
            <HomeIcon color="info" />
            <ProjectLink text="SHOP" to="/shop" />
          </Box>
          <Box
            onClick={() => {
              Router.push("/news");
              setOpenDrawer(false);
            }}
            display="flex"
            alignItems="center"
            sx={{
              ":active": {
                backgroundColor: "lightblue",
                borderRadius: "10px",
              },
              padding: "5px",
            }}
          >
            <NewspaperIcon color="info" />
            <ProjectLink text="NEWS" to="/news" />
          </Box>
          <Box
            onClick={() => {
              Router.push("/contact");
              setOpenDrawer(false);
            }}
            display="flex"
            alignItems="center"
            sx={{
              ":active": {
                backgroundColor: "lightblue",
                borderRadius: "10px",
              },
              padding: "5px",
            }}
          >
            <ContactPageIcon color="info" />
            <ProjectLink text="CONTACT" to="/contact" />
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Drawer;
