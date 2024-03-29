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
import Head from "next/head";
import { uploadFiles } from "@/utils/UploadImage";
import ProfileSnackBar from "@/components/ProfileSnackBar";
import EditableField from "@/components/EditableField";
import UploadImage from "@/components/UploadImage";
import Product from "@/components/Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import axios from "axios";
import { authenticateFunction } from "@/utils/sendCredentials";
import ChangePasswordModal from "@/components/ProfileComponents/ChangePasswordModal";
import EmailVerificationModal from "@/components/EmailVerificationModal";
import MetaData from "@/components/MetaData";

function Profile() {
  const Router = useRouter();
  const { user, getUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(false);
  const [items, setItems] = useState<FirestoreData[] | undefined>(undefined);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  const [snackBar, setSnackBar] = useState({
    show: false,
    type: "",
    text: "",
  });

  const [editUser, setEditUser] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    setEditUser({
      username: user?.username,
      email: user?.email,
      profilePicture: user?.profilePicture,
    });
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleUploadFile = async (files: any) => {
    setProgress(true);
    await uploadFiles(files, "profile").then((urls) => {
      setEditUser({ ...editUser, profilePicture: urls[0] });
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
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_API_KEY}/users/update`,
          editUser,
          authenticateFunction()
        )
        .then((res) => localStorage.setItem("user", JSON.stringify(res.data)));
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteListing = async (product_id: string) => {
    try {
      axios.delete(
        `${process.env.NEXT_PUBLIC_API_KEY}/product/delete/${product_id}`,
        authenticateFunction()
      );
      const updatedItems = items?.filter((item) => item._id !== product_id);
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserProducts = async () => {
      try {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_KEY}/product/user/products`,
            authenticateFunction()
          )
          .then((res) => {
            setItems(res.data);
          });
      } catch (error: any) {
        Router.push("/login");
      }
    };
    getUserProducts();
  }, []);

  const deleteAccount = () => {
    try {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_API_KEY}/users/delete`,
          authenticateFunction()
        )
        .then(() => {
          alert("User deleted successfully");
          Router.push("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [openVerifyEmailModal, setOpenVerifyEmailModal] = useState(false);

  const VerifyEmail = () => {
    try {
      axios.patch(
        `${process.env.NEXT_PUBLIC_API_KEY}/users/send/email/profile`,
        {},
        authenticateFunction()
      );
      setOpenVerifyEmailModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || !editUser) {
    return <Loader />;
  } else
    return (
      <>
        <MetaData text="Profile" />
        <EmailVerificationModal
          email={editUser.email}
          open={openVerifyEmailModal}
          handleClose={() => setOpenVerifyEmailModal(false)}
        />
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
                name="username"
                edit={edit}
                value={editUser.username}
                title="Name"
                handleChange={handleChange}
              />
              <EditableField
                user={user?.userType.isVerified === "3"}
                edit={edit}
                handleChange={handleChange}
                name="email"
                title="Email"
                value={editUser.email}
                handleVerifyEmail={VerifyEmail}
              />
              {edit && (
                <Button
                  onClick={() => setPasswordChangeModal(true)}
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
                <UploadImage
                  photoUrl={editUser.profilePicture}
                  progress={progress}
                />
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
                    <Typography variant="body1">Your listings</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {items?.map((item, index) => (
                      <Product
                        key={index}
                        item={item}
                        button={
                          <Button
                            onClick={() => DeleteListing(item._id)}
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
        </form>
        <ChangePasswordModal
          open={passwordChangeModal}
          handleClose={() => setPasswordChangeModal(false)}
        />
      </>
    );
}

export default Profile;
