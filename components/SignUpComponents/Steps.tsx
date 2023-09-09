import { useSignUp } from "@/context/SignUpContext";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  step: number;
  setStep: any;
  type: string | string[] | undefined;
}

function Steps({ step, type }: Props) {
  const [stepByType, setStepByType] = useState<string[] | null>(null);
  const { user } = useSignUp();

  useEffect(() => {
    if (type ? type === "normal" : user.type === "normal") {
      setStepByType(["Choose account type", "Register"]);
    } else
      setStepByType([
        "Choose account type",
        "Choose subscription plan",
        "Register",
        "Checkout",
      ]);
  }, [user.type]);

  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Stepper activeStep={step - 1} alternativeLabel>
        {stepByType?.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default Steps;
