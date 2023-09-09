import { useSignUp } from "@/context/SignUpContext";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  step: number;
  setStep: any;
  forward: string | string[] | undefined;
}

interface Data {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  __v: number;
}
function ChooseSubscriptionPlan({ step, setStep, forward }: Props) {
  const { handleChangeSubscription, subscription, setSubscription } =
    useSignUp();
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/business/products`
        );
        setData(result.data);
        if (!subscription) {
          localStorage.setItem("subscriptionPlan", result.data[0]._id);
          setSubscription(result.data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleNextStep = () => {
    if (forward) {
      setStep(step + 2);
    } else setStep(step + 1);
  };

  const handleBackStep = () => {
    if (forward) {
      setStep(2);
    } else setStep(step - 1);
  };

  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <RadioGroup onChange={(event) => handleChangeSubscription(event)}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="100px"
          gap="20px"
        >
          {data?.map((data) => (
            <Box
              key={data._id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              borderRadius="20px"
              padding="20px"
              bgcolor={subscription === data._id ? "#d1ebeb" : "#fff"}
              border={
                subscription === data._id ? "1px solid blue" : "1px solid #fff"
              }
              onClick={() => {
                localStorage.setItem("subscriptionPlan", data._id);
                setSubscription(data._id);
              }}
              sx={{ cursor: "pointer" }}
            >
              <FormControlLabel
                value={data._id}
                control={<Radio />}
                label={data.name}
                checked={data._id === subscription}
              />
              <Typography variant="caption" color="grey">
                {data.price} {data.currency}
              </Typography>
            </Box>
          ))}
        </Box>
      </RadioGroup>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="20px"
      >
        <Button
          variant="outlined"
          color="error"
          sx={{ height: "50px" }}
          onClick={handleBackStep}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ height: "50px" }}
          onClick={handleNextStep}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default ChooseSubscriptionPlan;
