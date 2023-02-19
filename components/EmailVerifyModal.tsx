import { Box, Modal, Typography } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: any;
  text: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: "50%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EmailVerifyModal({ open, handleClose, text }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5">{text}</Typography>
      </Box>
    </Modal>
  );
}

export default EmailVerifyModal;
