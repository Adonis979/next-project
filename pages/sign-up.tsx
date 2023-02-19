import { useAuth } from "@/context/AuthContext";
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
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const { signup } = useAuth();
  const Router = useRouter();

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
      await signup(user.email, user.password, user.name);
      Router.push("/");
      setLoader(false);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError({ error: true, helperText: "Email already in use" });
      }
    }
    setLoader(false);
  };

  return (
    <>
      <Head>
        <title>Grerëzat - Sign up</title>
        <meta name="description" content="Sign up to grerëzat" />
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
            <Typography variant="h4">Sign Up</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="h6">Your name</Typography>
              <TextField
                required
                name="name"
                value={user.name}
                onChange={handleChange}
                label="Type your name"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="h6">Email</Typography>
              <TextField
                error={emailError.error}
                helperText={emailError.helperText}
                required
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                label="Type your email"
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="h6">Password</Typography>
              <TextField
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                label="Type your password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                      position="end"
                    >
                      {" "}
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              type="submit"
              sx={{ marginTop: "50px" }}
              variant="contained"
            >
              Sign up
            </Button>
            <Typography variant="subtitle1">
              Already have an account?{" "}
              <Link style={{ fontStyle: "italic" }} href="/login">
                Log in
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
      </form>
    </>
  );
}

export default SignUp;
