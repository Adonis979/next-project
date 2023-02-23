import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface Props {
  snackBar: { show: boolean; type: string; text: string };
  setSnackBar: any;
}

function ProfileSnackBar({ snackBar, setSnackBar }: Props) {
  return (
    <Snackbar
      open={snackBar.show}
      autoHideDuration={6000}
      onClose={() =>
        setSnackBar({
          show: false,
          type: snackBar.type,
          text: snackBar.text,
        })
      }
    >
      {snackBar.type === "success" ? (
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackBar.text}
        </Alert>
      ) : (
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackBar.text}
        </Alert>
      )}
    </Snackbar>
  );
}

export default ProfileSnackBar;
