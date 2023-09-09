import { useSignUp } from "@/context/SignUpContext";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

function ChooseAccType({ setStep, setType }: any) {
  const normalAcc = [
    { contains: true, description: "Free" },
    { contains: false, description: "Higher priority on the listings" },
    { contains: false, description: "Verified Seller" },
    {
      contains: false,
      description: "No limitation on amount of posts per day",
    },
    { contains: false, description: "No verification by admin when posting" },
  ];

  const businessAcc = [
    { contains: false, description: "Free" },
    { contains: true, description: "Higher priority on the listings" },
    { contains: true, description: "Verified Seller" },
    { contains: true, description: "No limitation on amount of posts per day" },
    { contains: true, description: "No verification by admin when posting" },
  ];
  const { handleChange, user, setUser } = useSignUp();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      alignItems="center"
      mt="40px"
      width="100%"
    >
      <RadioGroup name="type" onChange={handleChange}>
        <Box display="flex" gap="10px" flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            padding="20px"
            alignItems="center"
            borderRadius="20px"
            bgcolor={user.type === "normal" ? "#d1ebeb" : "#fff"}
            border={
              user.type === "normal" ? "1px solid blue" : "1px solid #fff"
            }
            sx={{ cursor: "pointer" }}
            onClick={() => setUser({ ...user, type: "normal" })}
          >
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="NORMAL"
              checked={user.type === "normal"}
            />
            <Box display="flex" flexDirection="column" gap="10px">
              {normalAcc.map((feature, index) => (
                <Box display="flex" gap="10px" key={index}>
                  {feature.contains ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <DoNotDisturbOnIcon color="error" />
                  )}
                  <Typography>{feature.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            padding="20px"
            alignItems="center"
            bgcolor={user.type === "business" ? "#d1ebeb" : "#fff"}
            border={
              user.type === "business" ? "1px solid blue" : "1px solid #fff"
            }
            borderRadius="20px"
            sx={{ cursor: "pointer" }}
            onClick={() => setUser({ ...user, type: "business" })}
          >
            <FormControlLabel
              value="business"
              control={<Radio />}
              label="BUSINESS"
              checked={user.type === "business"}
            />
            <Box display="flex" flexDirection="column" gap="10px">
              {businessAcc.map((feature, index) => (
                <Box display="flex" gap="10px" key={index}>
                  {feature.contains ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <DoNotDisturbOnIcon color="error" />
                  )}
                  <Typography>{feature.description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </RadioGroup>
      <Button
        sx={{ height: "50px", mb: "20px" }}
        variant="outlined"
        onClick={() => {
          setStep(2);
          setType(user.type);
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default ChooseAccType;
