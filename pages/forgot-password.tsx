import InputTextField from "@/components/InputTextField";
import LeftSideImage from "@/components/LeftSideImage";
import RigtSideFields from "@/components/RigtSideFields";
import { Box, Container, Grid } from "@mui/material";
import React from "react";

function ForgotPassword() {
  return (
    <Grid container sx={{ position: "relative" }}>
      <LeftSideImage />
      <RigtSideFields />
    </Grid>
  );
}

export default ForgotPassword;

ForgotPassword.noLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
