import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInputProps,
  InputAdornment,
  InputProps,
  OutlinedInputProps,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  fieldError?: { error: boolean; helperText: string };
  showPassword?: boolean;
  handleChange: any;
  name: string;
  value: any;
  setShowPassword?: any;
  label: string;
  type?: string;
  isPasswordInput?: boolean;
}

function InputTextField({
  fieldError,
  showPassword,
  handleChange,
  name,
  value,
  setShowPassword,
  label,
  type,
  isPasswordInput,
}: Props) {
  return (
    <>
      <TextField
        fullWidth
        error={fieldError?.error}
        helperText={fieldError?.helperText}
        required
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        label={label}
        variant="outlined"
        InputProps={
          isPasswordInput
            ? {
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
              }
            : undefined
        }
      />
    </>
  );
}

export default InputTextField;
