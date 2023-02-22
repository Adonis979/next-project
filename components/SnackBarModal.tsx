import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  handleClose: () => void;
  text: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "50%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  overflow: "auto",
};

function SnackBarModal({ open, handleClose, text }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Image
            style={{ borderRadius: "50%" }}
            height={120}
            width={120}
            src="/images/grerzat.png"
            alt="grerzat"
          />
          <Typography sx={{ textAlign: "center" }} variant="h6">
            {text}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default SnackBarModal;
