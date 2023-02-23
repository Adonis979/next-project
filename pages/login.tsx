import InputTextField from "@/components/InputTextField";
import VerifyModal from "@/components/VerifyModal";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { ResetPassword } from "@/utils/Profile";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { sendPasswordResetEmail } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const [loader, setLoader] = useState(false);
  const Router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    event.preventDefault();
    try {
      await login(user.email, user.password);
      setEmailError({ error: false, helperText: "" });
      setPasswordError({ error: false, helperText: "" });
      Router.push("/");
      setLoader(false);
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setPasswordError({ error: true, helperText: "Wrong password" });
      }
      if (error.code === "auth/user-not-found") {
        setEmailError({ error: true, helperText: "This email does not exist" });
      }
    }
    setLoader(false);
  };
  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
      Router.push("/");
    } catch (error: any) {
      alert(error.code);
    }
  };

  const [modalText, setModalText] = useState("");
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const handleResetPassword = async () => {
    if (user.email) {
      ResetPassword(user, { setOpenVerifyModal, setModalText });
    }
  };

  return (
    <>
      <Head>
        <title>Grerëzat - Login</title>
        <meta name="description" content="Login to grerëzat" />
        <link rel="icon" href="/images/grerzat.png" />
      </Head>
      <form onSubmit={handleSubmit}>
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
              width: { xs: "100%", sm: "30%" },
              gap: "30px",
              padding: "50px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Typography variant="h4">Log In</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <InputTextField
                title="Email"
                fieldError={emailError}
                type="email"
                name="email"
                value={user.email}
                handleChange={handleChange}
                isPasswordInput={undefined}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <InputTextField
                  isPasswordInput={true}
                  title="Password"
                  fieldError={passwordError}
                  handleChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                />

                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Typography variant="subtitle1">Forgot password?</Typography>
                  <Typography
                    onClick={handleResetPassword}
                    sx={{ color: "#4d4dff", cursor: "pointer" }}
                    variant="subtitle1"
                  >
                    Reset
                  </Typography>
                </Box>
              </Box>
              <Button
                type="submit"
                sx={{ marginTop: "50px" }}
                variant="contained"
              >
                Log in
              </Button>
              <Button
                onClick={handleLoginGoogle}
                sx={{
                  backgroundColor: "red",
                  ":hover": { backgroundColor: "red", opacity: "0.8" },
                  color: "white",
                }}
              >
                Login with Google
              </Button>
              <Typography variant="subtitle1">
                Dont have an account?{" "}
                <Link style={{ fontStyle: "italic" }} href="/sign-up">
                  Sign up
                </Link>
              </Typography>
            </Box>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loader}
              onClick={() => setLoader(false)}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
          <VerifyModal
            open={openVerifyModal}
            handleClose={() => setOpenVerifyModal(false)}
            text={modalText}
          />
        </Box>
      </form>
    </>
  );
}

export default Login;
