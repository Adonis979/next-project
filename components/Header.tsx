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
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
    <Box
      sx={{
        backgroundColor: "#f2f2f2",
        padding: { xs: "20px 20px 20px 0px", sm: "20px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link href="/" style={{ color: "black", textDecoration: "none" }}>
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
        <Link href="/about" style={{ color: "black", textDecoration: "none" }}>
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
        <Link href="/shop" style={{ color: "black", textDecoration: "none" }}>
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
      {/* for small displays */}
      <Button
        sx={{ padding: "0px !important" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{ display: { xs: "flex", sm: "none" } }} />
      </Button>
      <SwipeableDrawer
        sx={{ display: { xs: "flex", sm: "none" } }}
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
      {/* ----------------------------------------------- */}
      <Box>
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
                horizontal: "left",
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
          <Button sx={{ color: "black" }} onClick={() => Router.push("/login")}>
            <PersonAddIcon sx={{ height: "30px", width: "30px" }} />
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Header;
