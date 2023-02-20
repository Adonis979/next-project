import { useAuth } from "@/context/AuthContext";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "@/firebase";
import {
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifyModal from "@/components/VerifyModal";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { uploadFile } from "@/utils/UploadImage";

function Profile() {
  const Router = useRouter();
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
    uploadFile(files, "images", { setProgress, setPhotoUrl });
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

  const [modalText, setModalText] = useState("");
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const handleVerifyEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        setOpenVerifyModal(true);
        setModalText("Email verification send. Check your email");
      } catch (error: any) {
        setOpenVerifyModal(true);
        setModalText(`${error.code}`);
      }
    }
  };

  const handleResetPassword = async () => {
    const user = auth.currentUser;
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user?.email);
        setOpenVerifyModal(true);
        setModalText(
          `Verification password reset send to email:${user?.email}`
        );
      } catch (error: any) {
        setModalText(
          "Verification password reset cannot be send. Please try again"
        );
      }
    }
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        setOpenVerifyModal(true);
        setModalText("Account has been deleted. We hope we will see you back");
        Router.push("/login");
      } catch (error) {
        setOpenVerifyModal(true);
        setModalText(
          "There was a problem while deleting the account. Please try again"
        );
      }
    }
  };
  return (
    <>
      <Head>
        <title>Grerëzat - Profile</title>
        <meta name="description" content="Profile of grerëza" />
        <link rel="icon" href="/images/grerzat.png" />
      </Head>
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
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                }}
                variant="h6"
              >
                Email
              </Typography>
              {edit ? (
                <>
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
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                    backgroundColor: "#ffcccc",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="subtitle1">{editUser.email}</Typography>
                  {user?.emailVerified && (
                    <CheckCircleOutlineIcon color="success" />
                  )}
                </Box>
              )}
              {!user?.emailVerified && (
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    gap: "20px",
                    marginTop: "5px",
                  }}
                >
                  <Alert sx={{ width: "100%" }} severity="error">
                    Email is not verified
                  </Alert>
                  <Button
                    onClick={handleVerifyEmail}
                    sx={{ width: "50%" }}
                    variant="outlined"
                    color="success"
                  >
                    Verify
                  </Button>
                </Box>
              )}
            </Box>
            {edit && (
              <Button
                onClick={handleResetPassword}
                variant="contained"
                color="error"
              >
                Reset Password
              </Button>
            )}
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
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  loader={() => photoUrl || "/images/no-user-image.png"}
                  src={photoUrl || "/images/no-user-image.png"}
                  alt="user-photo"
                  width={300}
                  height={300}
                ></Image>
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
            {edit && (
              <Button
                onClick={deleteAccount}
                sx={{ marginTop: "50px" }}
                fullWidth
                variant="contained"
                color="error"
              >
                Delete account
              </Button>
            )}
          </Box>
        </Box>
        <VerifyModal
          open={openVerifyModal}
          handleClose={() => setOpenVerifyModal(false)}
          text={modalText}
        />
      </form>
    </>
  );
}

export default Profile;
