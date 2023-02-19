import { Box, Modal, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import React from "react";

interface Props {
  open: boolean;
  handleClose: any;
  text: string;
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
};

function VerifyModal({ open, handleClose, text }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          src="/images/grerzat.png"
        ></img>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          {text}
        </Typography>
      </Box>
    </Modal>
  );
}

export default VerifyModal;
