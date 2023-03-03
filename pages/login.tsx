import InputTextField from "@/components/InputTextField";
import VerifyModal from "@/components/VerifyModal";
import { useAuth } from "@/context/AuthContext";
import { ResetPassword } from "@/utils/Profile";
import { Backdrop, Box, Button, CircularProgress, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";

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
        <Box>
          <Grid container sx={{ position: "relative" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                height: { xs: "400px", md: "757px" },
                position: "relative",
              }}
            >
              <Image
                layout="fill"
                alt="grerza"
                src="/images/layout-2.png"
              ></Image>
              <Image
                onClick={() => Router.push("/")}
                width={200}
                height={35}
                style={{
                  position: "absolute",
                  top: "66px",
                  left: "38px",
                  cursor: "pointer",
                }}
                alt="grerzat"
                src="/images/grerza-white.png"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFF6F6",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: { xs: "50px", sm: "none" },
                  width: { xs: "80%", md: "60%" },
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "700",
                      color: "#0E2F56",
                    }}
                  >
                    WELCOME BACK
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "400",
                      fontSize: "16px",
                      color: "#272727",
                      marginLeft: "10px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    We are happy that you are here again
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginTop: "50px",
                  }}
                >
                  <InputTextField
                    label="Email Address"
                    fieldError={emailError}
                    type="email"
                    name="email"
                    value={user.email}
                    handleChange={handleChange}
                    isPasswordInput={false}
                  />

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

                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      onClick={handleResetPassword}
                      variant="subtitle1"
                      sx={{
                        cursor: "pointer",
                        color: "#0E2F56",
                        fontFamily: "Montserrat",
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <Button
                    type="submit"
                    sx={{
                      height: "56px",
                      backgroundColor: "#0E2F56",
                      fontStyle: "Montserrat",
                    }}
                    variant="contained"
                  >
                    Log in
                  </Button>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <hr
                      style={{
                        width: "45%",
                        border: "none",
                        height: "1px",
                        margin: "20px 0",
                        backgroundColor: "#C7C7C7",
                      }}
                    ></hr>
                    <p
                      style={{
                        width: "10%",
                        textAlign: "center",
                        color: "#C7C7C7",
                      }}
                    >
                      or
                    </p>
                    <hr
                      style={{
                        width: "45%",
                        border: "none",
                        height: "1px",
                        backgroundColor: "#C7C7C7",
                        margin: "20px 0",
                      }}
                    ></hr>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onClick={handleLoginGoogle}
                      sx={{ width: "100%", height: "57px" }}
                      variant="outlined"
                    >
                      <img
                        style={{
                          width: "28px",
                          height: "28px",
                          marginRight: "10px",
                        }}
                        src="/images/google.png"
                      ></img>
                      Google
                    </Button>
                    <Button
                      sx={{ width: "100%", height: "57px" }}
                      variant="outlined"
                    >
                      <img
                        style={{
                          width: "28px",
                          height: "28px",
                          marginRight: "10px",
                        }}
                        src="/images/facebook.png"
                      ></img>
                      Facebook
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      marginBottom: { xs: "50px", md: "0px" },
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "Montserrat" }}
                      variant="subtitle1"
                    >
                      Dont have an account?{" "}
                      <Link style={{ fontStyle: "italic" }} href="/sign-up">
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
          onClick={() => setLoader(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <VerifyModal
          open={openVerifyModal}
          handleClose={() => setOpenVerifyModal(false)}
          text={modalText}
        />
      </form>
    </>
  );
}

export default Login;

Login.noLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
