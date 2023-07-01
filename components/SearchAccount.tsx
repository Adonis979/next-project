import { Box, Button, Typography } from "@mui/material";
import React from "react";
import InputTextField from "./InputTextField";
import { useRouter } from "next/router";

interface Props {
  email: string;
  handleChange: (event: any) => void;
  emailError: { error: boolean; helperText: string };
}

function SearchAccount({ email, handleChange, emailError }: Props) {
  const Router = useRouter();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      bgcolor="white"
      padding="20px"
      borderRadius="10px"
    >
      <Typography>
        Please enter your email to search for your account.
      </Typography>
      <InputTextField
        name="email"
        label="Email"
        type="email"
        value={email}
        handleChange={handleChange}
        fieldError={emailError}
      />
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Button
          variant="contained"
          onClick={() => Router.push("/login")}
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

export default SearchAccount;
