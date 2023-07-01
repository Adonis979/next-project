import InputTextField from "@/components/InputTextField";
import LeftSideImage from "@/components/LeftSideImage";
import RigtSideFields from "@/components/RigtSideFields";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

function ForgotPassword() {
  const [loader, setLoader] = useState(false);
  return (
    <Grid container sx={{ position: "relative" }}>
      <LeftSideImage />
      <RigtSideFields setLoader={setLoader} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}

export default ForgotPassword;

ForgotPassword.noLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
