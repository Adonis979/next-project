import LeftSideImage from "@/components/LeftSideImage";
import Loader from "@/components/Loader";
import MetaData from "@/components/MetaData";
import BusinessAccRegistration from "@/components/SignUpComponents/BusinessAccRegistration";
import Checkout from "@/components/SignUpComponents/Checkout";
import ChooseAccType from "@/components/SignUpComponents/ChooseAccType";
import ChooseSubscriptionPlan from "@/components/SignUpComponents/ChooseSubscriptionPlan";
import NormalAccRegistration from "@/components/SignUpComponents/NormalAccRegistration";
import Steps from "@/components/SignUpComponents/Steps";
import { SignUpContextProvider } from "@/context/SignUpContext";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function SignUp() {
  const [step, setStep] = useState<number>(1);
  const [type, setType] = useState<string | string[] | undefined>("");
  const router = useRouter();
  const { forward } = router.query;

  useEffect(() => {
    const { step, type } = router.query;
    if (step) {
      setStep(Number(step));
      setType(type);
    }
  }, []);

  return (
    <>
      <SignUpContextProvider>
        <MetaData text="Register" />
        <Grid container sx={{ position: "relative" }}>
          <LeftSideImage />
          <Grid item xs={12} md={6} display="flex" flexDirection="column">
            <Steps step={step} setStep={setStep} type={type} />
            {step === 1 && (
              <ChooseAccType setStep={setStep} setType={setType} />
            )}
            {step === 2 && type === "normal" && (
              <NormalAccRegistration step={step} setStep={setStep} />
            )}
            {step === 2 && type === "business" && (
              <ChooseSubscriptionPlan
                step={step}
                setStep={setStep}
                forward={forward}
              />
            )}
            {step === 3 && type === "business" && (
              <BusinessAccRegistration
                step={step}
                setStep={setStep}
                forward={forward}
              />
            )}
            {step === 4 && type === "business" && (
              <Checkout step={step} setStep={setStep} forward={forward} />
            )}
          </Grid>
        </Grid>
      </SignUpContextProvider>
    </>
  );
}

export default SignUp;
