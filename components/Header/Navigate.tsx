import { Avatar, Box, Button, Chip, Popover } from "@mui/material";
import Router from "next/router";
import React from "react";
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
  return (
    <>
      <ProjectLink text="HOME" to="/" />
      <ProjectLink text="ABOUT" to="/about" />
      <ProjectLink text="SHOP" to="/shop" />
      <ProjectLink text="NEWS" to="/news" />
      <ProjectLink text="CONTACT" to="/contact" />
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
