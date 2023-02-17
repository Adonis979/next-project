import { Avatar, Box, Button, Chip, Popover, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
        backgroundColor: "lightgray",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
      <Box>
        <Chip
          onClick={handleClick}
          avatar={<Avatar alt="Natacha" src="/images/no-user-image.png" />}
          label="Avatar"
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
            <Button size="large" sx={{ gap: "10px" }}>
              Profile
              <Avatar
                sx={{ height: "30px", width: "30px" }}
                alt="Remy Sharp"
                src="/images/no-user-image.png"
              />
            </Button>
            <Button size="large">Sign Out</Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}

export default Header;
