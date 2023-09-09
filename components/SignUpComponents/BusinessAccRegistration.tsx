import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputTextField from "../InputTextField";
import { useSignUp } from "@/context/SignUpContext";
import { useCookies } from "react-cookie";

interface Props {
  step: number;
  setStep: any;
  forward: string | string[] | undefined;
}

function BusinessAccRegistration({ step, setStep, forward }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { user, handleSubmit, handleChange, emailError, passwordError } =
    useSignUp();
  const [cookie, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (forward) {
      setStep(step + 1);
    } else if (cookie.token) {
      setStep(step + 1);
    }
  }, [handleSubmit]);

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
            width: { xs: "100%", sm: "80%" },
            gap: "30px",
            padding: "50px",
            borderRadius: "20px",
          }}
        >
          <Typography variant="h6" fontWeight={600} ml="10px">
            Sign up as business account
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <InputTextField
              handleChange={handleChange}
              label="Company Name"
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
              type="email"
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
          <Box width="100%" display="flex" justifyContent="space-around">
            <Button
              sx={{ height: "50px" }}
              variant="outlined"
              color="warning"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            <Button type="submit" sx={{ height: "50px" }} variant="outlined">
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default BusinessAccRegistration;
