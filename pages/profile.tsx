import { useAuth } from "@/context/AuthContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "@/firebase";
import VerifyModal from "@/components/VerifyModal";
import Head from "next/head";
import { uploadFiles } from "@/utils/UploadImage";
import {
  DeleteAccount,
  ResetPassword,
  UpdateProfile,
  VerifyEmail,
} from "@/utils/Profile";
import ProfileSnackBar from "@/components/ProfileSnackBar";
import EditableField from "@/components/EditableField";
import UploadImage from "@/components/UploadImage";
import { DeleteListings, GetProfileListing } from "@/utils/Listings";
import Product from "@/components/Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

function Profile() {
  const Router = useRouter();
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(false);
  const [snackBar, setSnackBar] = useState({
    show: false,
    type: "",
    text: "",
  });
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
  const handleUploadFile = async (files: any) => {
    setProgress(true);
    await uploadFiles(files, "profile").then((urls) => {
      setPhotoUrl(urls[0]);
    });
    setProgress(false);
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
      UpdateProfile(user, editUser, photoUrl, { setEdit, setSnackBar });
    } else {
      alert("You should sign in");
    }
  };

  const [modalText, setModalText] = useState("");
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const handleVerifyEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      VerifyEmail(user, { setOpenVerifyModal, setModalText });
    }
  };

  const handleResetPassword = async () => {
    const user = auth.currentUser;
    if (user?.email) {
      ResetPassword(user, { setOpenVerifyModal, setModalText });
    }
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      DeleteAccount(user, { setOpenVerifyModal, setModalText });
    }
  };

  const [items, setItems] = useState<FirestoreData[]>([
    {
      title: "",
      description: "",
      photoUrl: [""],
      user: "",
      size: "",
      userId: "",
      date: "",
      docId: "",
    },
  ]);

  useEffect(() => {
    console.log("jam ketu");
    const getUser = async () => {
      try {
        await GetProfileListing(setItems, user?.uid);
      } catch (error: any) {
        Router.push("/login");
      }
    };
    getUser();
  }, []);

  if (!user) {
    return <Loader />;
  } else
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
              backgroundColor: "#FFF6F6",
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
                backgroundColor: "white",
              }}
            >
              <ProfileSnackBar setSnackBar={setSnackBar} snackBar={snackBar} />
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
              <EditableField
                user={true}
                name="name"
                edit={edit}
                value={editUser.name}
                title="Name"
                handleChange={handleChange}
              />
              <EditableField
                user={user?.emailVerified}
                edit={edit}
                handleChange={handleChange}
                name="email"
                title="Email"
                value={editUser.email}
                handleVerifyEmail={handleVerifyEmail}
              />
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
                <UploadImage photoUrl={photoUrl} progress={progress} />
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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Your listings</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {items.map((item, index) => (
                      <Product
                        key={index}
                        item={item}
                        button={
                          <Button
                            onClick={() => DeleteListings(item.docId)}
                            variant="contained"
                            color="error"
                          >
                            DELETE
                          </Button>
                        }
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
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
