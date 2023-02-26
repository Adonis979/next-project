import { Avatar, Box, Button, Chip, Popover } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  user: any;
  handleClick: any;
  handleClose: any;
  anchorEl: any;
  id: any;
  open: any;
  logout: any;
}

function ProfileCard({
  user,
  handleClick,
  handleClose,
  anchorEl,
  id,
  open,
  logout,
}: Props) {
  const Router = useRouter();
  return (
    <>
      {user ? (
        <>
          <Chip
            sx={{ marginRight: { xs: "30px", md: "none" } }}
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
          sx={{ marginRight: { xs: "30px", md: "0px" } }}
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

export default ProfileCard;
