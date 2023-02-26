import {
  Avatar,
  Box,
  Button,
  Chip,
  Popover,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Drawer from "./Drawer";
import Logo from "./Logo";
import ProjectLink from "../ProjectLink";
import Navigate from "./Navigate";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const Router = useRouter();
  const { user, logout } = useAuth();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? undefined : "simple-popover";
  return (
    <Box sx={{ backgroundColor: "#FFF6F6", padding: "30px 30px 0px 30px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "20%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* for small displays */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
          </Box>
          {/* Logo */}
          <Logo />
        </Box>
        {/* Right Side */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Navigate
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            id={id}
            logout={logout}
            open={open}
            user={user}
          />
        </Box>
      </Box>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#272727",
          margin: "30px 0px 0px 0px",
        }}
      ></hr>
    </Box>
  );
}

export default Header;
