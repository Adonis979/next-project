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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function login() {
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

  return (
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
              error={passwordError.error}
              helperText={passwordError.helperText}
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
          <Button type="submit" sx={{ marginTop: "50px" }} variant="contained">
            Log in
          </Button>
          <Button
            onClick={() => {
              loginWithGoogle();
              Router.push("/");
            }}
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
    </form>
  );
}

export default login;
