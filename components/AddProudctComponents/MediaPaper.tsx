import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import Dropzone from "react-dropzone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "next/image";
import { useAddProductContext } from "@/context/AddProductContext";

function MediaPaper() {
  const { handleAddPhoto, photos, handleDelete, handleClick } =
    useAddProductContext();
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "20px",
        width: "100%",
      }}
    >
      <Typography
        ml="10px"
        variant="body1"
        fontWeight="500px"
        fontFamily="Montserrat"
      >
        Media
      </Typography>
      <Dropzone onDrop={(acceptedFiles) => handleAddPhoto(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              border: "2px dashed blue",
              borderRadius: "10px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#a7e6eb",
              },
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {photos.length === 0 ? (
              <p>Drag 'n' drop some files here, or click to select files</p>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: "20px",
                }}
              >
                {photos.map((photo: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: "20px",
                      width: "200px",
                      height: "200px",
                      position: "relative",
                    }}
                  >
                    <Box position="absolute" top={0} right={0} zIndex="2">
                      <IconButton
                        onClick={(event: any) => handleDelete(event, index)}
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            backgroundColor: "red",
                            width: "23px",
                            height: "23px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <HighlightOffIcon sx={{ color: "white" }} />
                        </Box>
                      </IconButton>
                    </Box>
                    <Image
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      fill
                      objectFit="cover"
                      style={{ borderRadius: "20px", zIndex: "1" }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Dropzone>
    </Paper>
  );
}

export default MediaPaper;
