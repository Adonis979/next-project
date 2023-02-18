import { useAuth } from "@/context/AuthContext";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { auth, storage } from "@/firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function profile() {
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [snackBar, setSnackBar] = useState({
    show: false,
    type: "",
    text: "",
  });
  const vertical = "top";
  const horizontal = "center";
  const [editUser, setEditUser] = useState({
    name: user?.name,
    email: user?.email,
  });

  const [photoUrl, setPhotoUrl] = useState(user?.photo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleUploadFile = (files: any) => {
    const image = files[0];
    if (image) {
      const name = image?.name;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPhotoUrl(downloadURL);
            setProgress(0);
          });
        }
      );
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        if (
          user?.displayName !== editUser.name ||
          user?.photoURL !== photoUrl
        ) {
          await updateProfile(user, {
            displayName: editUser.name,
            photoURL: photoUrl,
          });
          setSnackBar({
            show: true,
            type: "success",
            text: "Profile updated successfully",
          });
        }
        if (user?.email !== editUser.email) {
          await updateEmail(user, editUser.email);
          setSnackBar({
            show: true,
            type: "success",
            text: "Profile updated successfully",
          });
        }
        setEdit(false);
      } catch (error: any) {
        setSnackBar({
          show: true,
          type: "error",
          text: "Failed to update profile",
        });
      }
    } else {
      alert("You should sign in");
    }
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
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
          <Snackbar
            open={snackBar.show}
            autoHideDuration={6000}
            onClose={() =>
              setSnackBar({
                show: false,
                type: snackBar.type,
                text: snackBar.text,
              })
            }
            anchorOrigin={{ vertical, horizontal }}
          >
            {snackBar.type === "success" ? (
              <Alert severity="success" sx={{ width: "100%" }}>
                {snackBar.text}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ width: "100%" }}>
                {snackBar.text}
              </Alert>
            )}
          </Snackbar>
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
                required
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
                {editUser.name}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography sx={{ marginLeft: "10px" }} variant="h6">
              Email
            </Typography>
            {edit ? (
              <TextField
                required
                type="email"
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
                {editUser.email}
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
            {progress > 0 ? (
              <CircularProgress color="success" />
            ) : (
              <img
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                }}
                src={photoUrl || "/images/no-user-image.png"}
              ></img>
            )}
            {edit && (
              <>
                <input
                  type="file"
                  onChange={(files) => handleUploadFile(files.target.files)}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleUploadClick}
                >
                  Upload
                </Button>
              </>
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
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </form>
  );
}

export default profile;
