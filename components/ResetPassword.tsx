import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputTextField from "./InputTextField";

interface Props {
  email: string;
  setFirstStep: any;
  setSecondStep: any;
  codeError: { error: boolean; helperText: string };
  handleChange: (event: any) => void;
  data: { code: number; newPassword: string };
  passwordError: { error: boolean; helperText: string };
}

function ResetPassword({
  email,
  setFirstStep,
  setSecondStep,
  codeError,
  handleChange,
  passwordError,
  data,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      bgcolor="white"
      padding="20px"
      borderRadius="10px"
    >
      <Typography>Check the code we sent you on {email}</Typography>
      <InputTextField
        handleChange={handleChange}
        label="Code"
        name="code"
        value={data?.code}
        type="number"
        fieldError={codeError}
      />
      <InputTextField
        handleChange={handleChange}
        label="New Password"
        name="newPassword"
        value={data.newPassword}
        type="password"
        fieldError={passwordError}
        isPasswordInput={true}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Button
          variant="contained"
          onClick={() => {
            setFirstStep(false);
            setSecondStep(false);
          }}
          sx={{
            backgroundColor: "#D3D3D3",
            color: "black",
            ":hover": { backgroundColor: "#D3D3D3" },
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#0E2F56",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPassword;
