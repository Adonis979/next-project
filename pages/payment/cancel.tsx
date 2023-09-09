import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function cancel() {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="20px">
      <Typography>Payment Canceled</Typography>
      <Button
        variant="contained"
        onClick={() => {
          router.push("/");
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default cancel;
