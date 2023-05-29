import { Avatar, Box, Button, Chip, Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectLink from "../ProjectLink";
import ProfileCard from "./ProfileCard";
import { useRouter } from "next/router";

interface Props {
  user: any;
  handleClick: any;
  handleClose: any;
  id: any;
  anchorEl: any;
  open: any;
  logout: any;
}

function Navigate({
  user,
  handleClick,
  handleClose,
  id,
  anchorEl,
  open,
  logout,
}: Props) {
  const [isHome, setIsHome] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isShop, setIsShop] = useState(false);
  const [isNews, setIsNews] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const Router = useRouter();
  const url = Router.asPath;
  const path = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    if (path === "shop") {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(true);
      setIsNews(false);
      setIsContact(false);
    } else if (path === "about") {
      setIsHome(false);
      setIsAbout(true);
      setIsShop(false);
      setIsNews(false);
      setIsContact(false);
    } else if (path === "add-product") {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(true);
      setIsContact(false);
    } else if (path === "contact") {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(false);
      setIsContact(true);
    } else if (path === "") {
      setIsHome(true);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(false);
      setIsContact(false);
    } else {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(false);
      setIsContact(false);
    }
  }, [url]);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <ProjectLink text="HOME" to="/" />
        {isHome && (
          <hr
            style={{
              borderTop: "2px solid red",
              margin: "5px 0",
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        <ProjectLink text="ABOUT" to="/about" />
        {isAbout && (
          <hr
            style={{
              borderTop: "2px solid red",
              margin: "5px 0",
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        <ProjectLink text="SHOP" to="/shop" />
        {isShop && (
          <hr
            style={{
              borderTop: "2px solid red",
              margin: "5px 0",
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        <ProjectLink text="ADD LISTING" to="/add-product" />
        {isNews && (
          <hr
            style={{
              borderTop: "2px solid red",
              margin: "5px 0",
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        <ProjectLink text="CONTACT" to="/contact" />
        {isContact && (
          <hr
            style={{
              borderTop: "2px solid red",
              margin: "5px 0",
            }}
          />
        )}
      </Box>
      <ProfileCard
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        logout={logout}
        open={open}
        user={user}
      />
    </>
  );
}

export default Navigate;
