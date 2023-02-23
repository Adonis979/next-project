import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Props {
  edit: boolean;
  handleChange: any;
  title: string;
  name: string;
  value: any;
  user?: any;
  handleVerifyEmail?: any;
}

function EditableField({
  user,
  value,
  name,
  title,
  edit,
  handleChange,
  handleVerifyEmail,
}: Props) {
  return (
    <Box>
      <Typography sx={{ marginLeft: "10px" }} variant="h6">
        {title}
      </Typography>
      {edit ? (
        <TextField
          required
          name={name}
          onChange={handleChange}
          fullWidth
          value={value}
          sx={{ marginTop: "10px", backgroundColor: "#ffcccc" }}
          label="Change Name"
          variant="outlined"
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            backgroundColor: "#ffcccc",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography variant="subtitle1">{value}</Typography>
          {user && <CheckCircleOutlineIcon color="success" />}
        </Box>
      )}
      {!user && (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            gap: "20px",
            marginTop: "5px",
          }}
        >
          <Alert sx={{ width: "100%" }} severity="error">
            Email is not verified
          </Alert>
          <Button
            onClick={handleVerifyEmail}
            sx={{ width: "50%" }}
            variant="outlined"
            color="success"
          >
            Verify
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default EditableField;
