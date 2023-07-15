import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Popover,
  Typography,
  styled,
} from "@mui/material";
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

const StyledPopover = styled(Popover)({
  "& .MuiPaper-root": {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 0px 0px",
    border: "1px solid lightblue",
    borderRadius: "20px",
  },
});

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
  console.log(user);
  return (
    <>
      {user ? (
        <>
          <IconButton
            onClick={handleClick}
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "10px",
              gap: "10px",
            }}
          >
            {user.userType.type === "business" ? (
              <Typography>Business</Typography>
            ) : (
              <Typography>Personal</Typography>
            )}

            <Avatar
              sx={{ width: 30, height: 30 }}
              alt="Natacha"
              src={user.profilePicture || "/images/no-user-image.png"}
            />
          </IconButton>
          <StyledPopover
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
                sx={{ borderRadius: "20px", gap: "10px" }}
              >
                Profile
                <Avatar
                  sx={{ height: "25px", width: "25px" }}
                  alt="Remy Sharp"
                  src={user.profilePicture || "/images/no-user-image.png"}
                />
              </Button>
              <Button
                onClick={() => {
                  logout();
                  handleClose();
                }}
                size="large"
                sx={{
                  borderRadius: "20px",
                  justifyContent: "flex-start !important",
                }}
              >
                Sign Out
              </Button>
            </Box>
          </StyledPopover>
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
