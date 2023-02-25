import React from "react";
import Image from "next/image";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useShop } from "@/context/ShopContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "30%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  overflow: "auto",
};
interface Props {
  text: string;
  docId: string;
}

function AreYouSure({ text, docId }: Props) {
  const { openDeleteModal, setOpenDeleteModal, handleDeleteListing } =
    useShop();

  const handleDelete = () => {
    handleDeleteListing(docId);
  };
  return (
    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <Box sx={style}>
        <Image
          style={{ borderRadius: "50%" }}
          height={120}
          width={120}
          src="/images/grerzat.png"
          alt="grerzat"
        ></Image>
        <Typography variant="h6" sx={{ textAlgin: "center" }}>
          Are you sure you want to delete this {text}
        </Typography>
        <Box sx={{ display: "flex", gap: "100px" }}>
          <Button
            onClick={() => setOpenDeleteModal(false)}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AreYouSure;
