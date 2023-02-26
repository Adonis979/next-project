import { Typography } from "@mui/material";
import { useRouter } from "next/router";

import React from "react";

interface Props {
  to: string;
  text: string;
}

function ProjectLink({ to, text }: Props) {
  const Router = useRouter();
  return (
    <Typography
      onClick={() => Router.push(`${to}`)}
      sx={{
        color: "#272727",
        fontFamily: "Montserrat",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        ":hover": { opacity: "0.5" },
      }}
    >
      {text}
    </Typography>
  );
}

export default ProjectLink;
