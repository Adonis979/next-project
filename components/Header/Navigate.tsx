import { Avatar, Box, Button, Chip, Popover } from "@mui/material";
import Router from "next/router";
import React from "react";
import ProjectLink from "../ProjectLink";

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
      {user ? (
        <>
          <Chip
            onClick={handleClick}
            avatar={
              <Avatar
                alt="Natacha"
                src={user.photo || "/images/no-user-image.png"}
              />
            }
            label={user.name}
            variant="outlined"
          />
          <Popover
            onClose={handleClose}
            id={id}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box
              sx={{
                padding: "20px",
                gap: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                onClick={() => {
                  Router.push("/profile");
                  handleClose();
                }}
                size="large"
                sx={{ gap: "10px" }}
              >
                Profile
                <Avatar
                  sx={{ height: "25px", width: "25px" }}
                  alt="Remy Sharp"
                  src={user.photo || "/images/no-user-image.png"}
                />
              </Button>
              <Button
                onClick={() => {
                  logout();
                  handleClose();
                }}
                size="large"
              >
                Sign Out
              </Button>
            </Box>
          </Popover>{" "}
        </>
      ) : (
        <Button
          onClick={() => Router.push("/login")}
          variant="contained"
          color="warning"
        >
          Login
        </Button>
      )}
    </>
  );
}

export default Navigate;
