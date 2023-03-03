import { CircularProgress } from "@mui/material";
import React from "react";
import Image from "next/image";

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
        <Image
          width={300}
          height={300}
          src={photoUrl || "/images/no-user-image.png"}
          alt="item"
          style={{ objectFit: "contain" }}
        ></Image>
      )}
    </>
  );
}

export default UploadImage;
