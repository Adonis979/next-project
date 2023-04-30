import { Avatar, Box, Button, Chip, Popover } from "@mui/material";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import ProjectLink from "../ProjectLink";
import ProfileCard from "./ProfileCard";

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
  const url = window.location.href;

  useEffect(() => {
    if (url.includes("/")) {
      setIsHome(true);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(false);
      setIsContact(false);
    }
    if (url.includes("/shop")) {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(true);
      setIsNews(false);
      setIsContact(false);
    }
    if (url.includes("/about")) {
      setIsHome(false);
      setIsAbout(true);
      setIsShop(false);
      setIsNews(false);
      setIsContact(false);
    }
    if (url.includes("/news")) {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(true);
      setIsContact(false);
    }
    if (url.includes("/contact")) {
      setIsHome(false);
      setIsAbout(false);
      setIsShop(false);
      setIsNews(false);
      setIsContact(true);
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
        <ProjectLink text="NEWS" to="/news" />
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
