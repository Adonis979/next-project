import { CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  progress: number;
  photoUrl: string | null;
}

function UploadImage({ progress, photoUrl }: Props) {
  return (
    <>
      {progress > 0 ? (
        <CircularProgress color="success" />
      ) : (
        <img
          width={300}
          height={300}
          src={photoUrl || "/images/no-user-image.png"}
          alt="item"
          style={{ objectFit: "contain" }}
        ></img>
      )}
    </>
  );
}

export default UploadImage;
