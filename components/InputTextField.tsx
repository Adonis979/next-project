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
  title: string;
  type?: string;
  isPasswordInput?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | undefined
    | boolean;
}

function InputTextField({
  fieldError,
  showPassword,
  handleChange,
  name,
  value,
  setShowPassword,
  title,
  type,
  isPasswordInput,
}: Props) {
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <TextField
        error={fieldError?.error}
        helperText={fieldError?.helperText}
        required
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        label="Type your password"
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
