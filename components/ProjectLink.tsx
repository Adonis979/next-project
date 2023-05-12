import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";

import React from "react";

interface Props {
  to: string;
  text: string;
}

function ProjectLink({ to, text }: Props) {
  const Router = useRouter();
  return (
    <IconButton
      onClick={() => {
        Router.push(`${to}`);
      }}
    >
      <Typography
        sx={{
          color: "#272727",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        {text}
      </Typography>
    </IconButton>
  );
}

export default ProjectLink;
