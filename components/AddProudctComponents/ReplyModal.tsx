import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  handleClose: any;
  text: string;
  error: { error: boolean; helperText: string };
}

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "600px" },
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "20px",
  gap: "20px",
};

function ReplyModal({ open, handleClose, text, error }: Props) {
  const router = useRouter();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!error?.error ? (
          <CheckCircleIcon fontSize="large" color="success" />
        ) : (
          <CancelIcon fontSize="large" color="error" />
        )}
        <Typography
          sx={{ textAlign: "center" }}
          variant="h6"
          width={{ xs: "100%", md: "70%" }}
        >
          {text}
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => router.push("/shop")}
        >
          Continue shopping
        </Button>
      </Box>
    </Modal>
  );
}

export default ReplyModal;
