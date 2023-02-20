import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { uploadFile } from "@/utils/UploadImage";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

interface Props {
  open: boolean;
  handleClose: () => void;
}

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
  height: "80%",
  overflow: "auto",
};

function AddListingModal({ open, handleClose }: Props) {
  const [item, setItem] = useState({
    name: "",
    description: "",
    size: "",
    category: "",
  });
  const { user } = useAuth();
  const uid = user?.uid;

  const handleChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    setItem({ ...item, [name]: value });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [progress, setProgress] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>("");

  const handleUploadFile = (files: any) => {
    uploadFile(files, "items", { setProgress, setPhotoUrl });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (photoUrl !== "") {
      try {
        await addDoc(collection(db, "items"), {
          name: item.name,
          description: item.description,
          size: item.size,
          category: item.category,
          photoUrl: photoUrl,
          user: user.name,
        });
        alert("sucessfully added item on list");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("You must input a photo");
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ borderRadius: "50%" }}
              height={120}
              width={120}
              src="/images/grerzat.png"
              alt="grerzat"
            ></Image>
          </Box>
          <TextField
            required
            value={item.name}
            name="name"
            onChange={handleChange}
            label="Name"
            variant="filled"
          />
          <TextField
            required
            value={item.description}
            name="description"
            onChange={handleChange}
            label="Description"
            variant="filled"
          />
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              required
              name="size"
              value={item.size}
              onChange={handleChange}
              label="Size"
            >
              <MenuItem value={"extra-large"}>Extra Large</MenuItem>
              <MenuItem value={"large"}>Large</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"small"}>Small</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              required
              name="category"
              value={item.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value={"shirt"}>T-Shirt</MenuItem>
              <MenuItem value={"jeans"}>Jeans</MenuItem>
              <MenuItem value={"Jacket"}>Jacket</MenuItem>
              <MenuItem value={"Shoes"}>Shoes</MenuItem>
            </Select>
          </FormControl>
          <input
            type="file"
            onChange={(files) => handleUploadFile(files.target.files)}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            onClick={handleUploadClick}
            variant="outlined"
            color="success"
          >
            Upload Photo
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {progress > 0 ? (
              <CircularProgress color="success" />
            ) : (
              <Image
                width={300}
                height={300}
                loader={() => photoUrl || "/images/no-user-image.png"}
                src={photoUrl || "/images/no-user-image.png"}
                alt="item"
              ></Image>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleClose} variant="outlined" color="warning">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}

export default AddListingModal;
