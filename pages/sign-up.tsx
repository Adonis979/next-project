import EmailVerificationModal from "@/components/EmailVerificationModal";
import InputTextField from "@/components/InputTextField";
import MetaData from "@/components/MetaData";
import { useAuth } from "@/context/AuthContext";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SignUp() {
  const [emailVerificationModal, setOpenEmailVerificationModal] =
    useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    type: "normal",
  });
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
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordReg = /^(?=.*\d).{8,}$/;
    if (!passwordReg.test(user.password)) {
      setPasswordError({
        error: true,
        helperText: "Password must contain 8 characters and at least a number",
      });
    } else {
      setLoader(true);
      try {
        const result = await signup(
          user.email,
          user.password,
          user.name,
          user.type
        );
        router.push("/login");
        setLoader(false);
      } catch (error: any) {
        if (error.response && error.response.status === 418) {
          setOpenEmailVerificationModal(true);
        } else
          setEmailError({ error: true, helperText: "Email already in use" });
      }
      setLoader(false);
    }
  };

  return (
    <>
      <MetaData text="Register" />
      <EmailVerificationModal
        email={user.email}
        open={emailVerificationModal}
        handleClose={() => setOpenEmailVerificationModal(false)}
      />
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
              bgcolor: "#fff",
              borderRadius: "20px",
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
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Choose account type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="normal"
                  name="type"
                  onChange={handleChange}
                >
                  <Box display="flex">
                    <FormControlLabel
                      value="normal"
                      control={<Radio />}
                      label="Normal"
                    />
                    <FormControlLabel
                      value="business"
                      control={<Radio />}
                      label="Business"
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
              <InputTextField
                handleChange={handleChange}
                label="Your name"
                name="name"
                value={user.name}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <InputTextField
                label="Email"
                handleChange={handleChange}
                value={user.email}
                fieldError={emailError}
                name="email"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <InputTextField
                isPasswordInput={true}
                label="Password"
                fieldError={passwordError}
                handleChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                setShowPassword={setShowPassword}
                showPassword={showPassword}
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
