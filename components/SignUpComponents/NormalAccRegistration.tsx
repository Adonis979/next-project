import { useSignUp } from "@/context/SignUpContext";
import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import InputTextField from "../InputTextField";

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function NormalAccRegistration({ step, setStep }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { user, handleSubmit, handleChange, emailError, passwordError } =
    useSignUp();
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
            Sign up as normal account
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
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default NormalAccRegistration;
