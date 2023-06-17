import { authenticateFunction } from "@/utils/sendCredentials";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "20px",
  alignItems: "center",
};

interface Props {
  open: boolean;
  handleClose: any;
}

function ChangePasswordModal({ open, handleClose }: Props) {
  const [info, setInfo] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [repeatNewPasswordError, setRepeatNewPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const [newPasswordError, setNewPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const [oldPasswordError, setOldPasswordError] = useState({
    error: false,
    helperText: "",
  });
  const handleChange = (event: any) => {
    const { value, name } = event?.target;
    setInfo({ ...info, [name]: value });
  };

  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (info.newPassword !== info.repeatNewPassword) {
      setRepeatNewPasswordError({
        error: true,
        helperText: "New Password should match the repeated password",
      });
      return;
    }
    if (info.newPassword.length < 8) {
      setNewPasswordError({
        error: true,
        helperText: "Password must contain at least 8 characters",
      });
      return;
    }
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/users/reset-password`,
        {
          oldPassword: info.oldPassword,
          newPassword: info.newPassword,
        },
        authenticateFunction()
      );
      setOldPasswordError({ error: false, helperText: "" });
      setNewPasswordError({ error: false, helperText: "" });
      setRepeatNewPasswordError({ error: false, helperText: "" });
      setSuccess(true);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setOldPasswordError({ error: true, helperText: "Wrong old password" });
      } else if (error.response && error.response.status === 402) {
        setNewPasswordError({
          error: true,
          helperText: "New Password must contain at least 8 char",
        });
      } else if (error.response && error.response.status === 403) {
        setNewPasswordError({
          error: true,
          helperText: "New Password cannot be the same as the old password",
        });
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          {success ? (
            <>
              <Typography>You changed your password successfully</Typography>
              <Button variant="contained" color="success" onClick={handleClose}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" textAlign="center">
                Please provide the nessecery info to update password
              </Typography>
              <TextField
                fullWidth
                required
                onChange={handleChange}
                error={oldPasswordError.error}
                helperText={oldPasswordError.helperText}
                name="oldPassword"
                value={info.oldPassword}
                variant="outlined"
                placeholder="Old Password"
                label="Old Password"
                type="password"
              />
              <TextField
                fullWidth
                required
                onChange={handleChange}
                name="newPassword"
                error={newPasswordError.error}
                helperText={newPasswordError.helperText}
                value={info.newPassword}
                variant="outlined"
                placeholder="New Password"
                label="New Password"
                type="password"
              />
              <TextField
                fullWidth
                required
                onChange={handleChange}
                name="repeatNewPassword"
                error={repeatNewPasswordError.error}
                helperText={repeatNewPasswordError.helperText}
                value={info.repeatNewPassword}
                variant="outlined"
                placeholder="Repeat new password"
                label="New Password"
                type="password"
              />
              <Button variant="contained" type="submit">
                Change Password
              </Button>
            </>
          )}
        </Box>
      </form>
    </Modal>
  );
}

export default ChangePasswordModal;
