import { Box, Button, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

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
  email: string;
}

function EmailVerificationModal({ open, handleClose, email }: Props) {
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" textAlign="center">
          Verify Email
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} textAlign="center">
          Finnish setting up your account at <b>{email}</b>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} textAlign="center">
          Please notice that it might take a bit to recieve the email! Please be
          patient.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => router.push("https://gmail.com")}
          sx={{ width: "50%" }}
        >
          Go to Gmail
        </Button>
      </Box>
    </Modal>
  );
}

export default EmailVerificationModal;
