import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

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
        <Image
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          width={100}
          height={100}
          loader={() => "/images/grerzat.png"}
          src="/images/grerzat.png"
          alt="grerza"
        ></Image>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          {text}
        </Typography>
      </Box>
    </Modal>
  );
}

export default VerifyModal;
