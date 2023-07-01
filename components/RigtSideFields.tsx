import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SearchAccount from "./SearchAccount";
import axios from "axios";
import ResetPassword from "./ResetPassword";
import { useRouter } from "next/router";

function RigtSideFields() {
  const Router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({
    error: false,
    helperText: "",
  });
  const [data, setData] = useState({ code: 0, newPassword: "" });
  const [codeError, setCodeError] = useState({ error: false, helperText: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    helperText: "",
  });

  const handleChangeNewPassword = (event: any) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleChange = (event: any) => {
    const { value } = event?.target;
    if (value === "") {
      setEmailError({ error: false, helperText: "" });
    }
    setEmail(value);
  };

  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);

  const handleSubmitEmail = async (event: any) => {
    event.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_KEY}/auth/forgot-password`, {
          email: email,
        })
        .then(() => {
          setFirstStep(true);
        });
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setEmailError({
          error: true,
          helperText: "Cannot find a user with this email, please register",
        });
      } else {
        console.log(error);
      }
    }
  };
  const handleSubmitResetPassword = async (event: any) => {
    event.preventDefault();
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_KEY}/users/forgot-password/reset`,
          {
            code: data.code,
            newPassword: data.newPassword,
            email: email,
          }
        )
        .then(() => Router.push("/login"));
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setPasswordError({
          error: true,
          helperText: "Password needs to be at least 8 characters",
        });
      } else if (error.response && error.response.status === 401) {
        setCodeError({
          error: true,
          helperText: "Code is wrong",
        });
      } else if (error.response && error.response.status === 403) {
        setCodeError({
          error: true,
          helperText: "To many failed attempts",
        });
      } else if (error.response && error.response.status === 404) {
        setCodeError({
          error: true,
          helperText: "Code has expired",
        });
      }
      console.log(error);
    }
  };
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF6F6",
        flexDirection: "column",
        height: { xs: "50vh", md: "100vh" },
      }}
    >
      <form onSubmit={handleSubmitEmail}>
        {!firstStep && (
          <SearchAccount
            email={email}
            handleChange={handleChange}
            emailError={emailError}
          />
        )}
      </form>
      <form onSubmit={handleSubmitResetPassword}>
        {firstStep && !secondStep && (
          <ResetPassword
            data={data}
            handleChange={handleChangeNewPassword}
            passwordError={passwordError}
            codeError={codeError}
            email={email}
            setFirstStep={setFirstStep}
            setSecondStep={setSecondStep}
          />
        )}
      </form>
    </Grid>
  );
}

export default RigtSideFields;
