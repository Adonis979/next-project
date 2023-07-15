import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          backgroundColor: "#f5f2f2",
          transition: "transform 0.1s",
          "&:hover": {
            transform: "scale(1.01)",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            "&:hover fieldset": {
              borderRadius: "15px",
            },
            "&.Mui-focused fieldset": {
              borderRadius: "15px",
            },
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            borderRadius: "15px",
            color: "white",
            boxShadow: "none",
            transition: "transform 0.1s",
            "&:hover": {
              boxShadow: "none", // Removes the hover shadow effect
              transform: "scale(1.02)",
            },
            "&:active": {
              transform: "scale(1)", // Reset the button scale on click
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: "15px",
            transition: "transform 0.1s",
            "&:hover": {
              boxShadow: "none", // Removes the hover shadow effect
              transform: "scale(1.02)",
            },
            "&:active": {
              transform: "scale(1)", // Reset the button scale on click
            },
          },
        },
      ],
    },
  },
});

export default theme;
