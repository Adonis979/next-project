import { useAuth } from "@/context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

function profile() {
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);

  const [editUser, setEditUser] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setEditUser({ ...editUser, [name]: value });
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", lg: "30%" },
          gap: "30px",
          padding: "50px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Profile</Typography>
          <Button onClick={() => setEdit(!edit)}>
            <EditIcon />
          </Button>
        </Box>
        <Box>
          <Typography sx={{ marginLeft: "10px" }} variant="h6">
            Name
          </Typography>
          {edit ? (
            <TextField
              name="name"
              onChange={handleChange}
              fullWidth
              value={editUser.name}
              sx={{ marginTop: "10px", backgroundColor: "#ffcccc" }}
              label="Change Name"
              variant="outlined"
            />
          ) : (
            <Typography
              sx={{
                padding: "10px",
                backgroundColor: "#ffcccc",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="subtitle1"
            >
              {user?.name}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography sx={{ marginLeft: "10px" }} variant="h6">
            Email
          </Typography>
          {edit ? (
            <TextField
              name="email"
              onChange={handleChange}
              fullWidth
              value={editUser.email}
              sx={{ marginTop: "10px", backgroundColor: "#ffcccc" }}
              label="Change Email"
              variant="outlined"
            />
          ) : (
            <Typography
              sx={{
                padding: "10px",
                backgroundColor: "#ffcccc",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="subtitle1"
            >
              {user?.email}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h6">Photo</Typography>
          <img
            style={{ width: "300px", height: "300px" }}
            src={user?.photo || "/images/no-user-image.png"}
          ></img>
          {edit && (
            <Button variant="contained" color="warning">
              Upload
            </Button>
          )}
        </Box>
        {edit && (
          <Box
            sx={{
              marginTop: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setEdit(false)}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default profile;
