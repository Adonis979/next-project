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
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { authenticateFunction } from "@/utils/sendCredentials";
import { useCookies } from "react-cookie";

const data = [
  {
    _id: "paypal",
    name: "PayPal",
    image: ["/images/PayPal.png"],
  },
  {
    _id: "stripe",
    name: "Visa or MasterCard",
    image: ["/images/visa.png", "/images/mastercard.png"],
  },
];

interface Props {
  step: number;
  setStep: any;
  forward: string | string[] | undefined;
}

function Checkout({ step, setStep, forward }: Props) {
  const router = useRouter();
  const [pmMethod, setPmMethod] = useState("paypal");
  const { subscription } = useSignUp();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPmMethod(value);
  };
  const [cookie, setCookie] = useCookies(["token"]);

  const handleCheckout = async () => {
    if (pmMethod === "paypal") {
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/payment/paypal`,
          {
            success_url: "http://localhost:3000/payment/success?payment=paypal",
            cancel_url: "http://localhost:3000/payment/cancel",
            item_id: subscription,
          },
          authenticateFunction(cookie)
        );
        router.push(result.data.redirect_url);
      } catch (error) {}
    } else if (pmMethod === "stripe") {
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/payment/stripe`,
          {
            success_url: "localhost:3000/payment/success?payment=stripe",
            cancel_url: "localhost:3000/payment/cancel",
            item_id: subscription,
          },
          authenticateFunction(cookie)
        );
        router.push(result.data.redirect_url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBackStep = () => {
    if (forward) {
      setStep(step - 2);
    } else setStep(step - 1);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="40px"
      flexDirection="column"
    >
      <RadioGroup
        onChange={(event) => {
          handleChange(event);
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          mt={{ xs: "20px", sm: "100px" }}
          gap="20px"
        >
          {data.map((data) => (
            <Box
              key={data._id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              maxWidth="200px"
              borderRadius="20px"
              padding="20px"
              gap="10px"
              bgcolor={data._id === pmMethod ? "#d1ebeb" : "#fff"}
              border={
                data._id === pmMethod ? "1px solid blue" : "1px solid #fff"
              }
              onClick={() => setPmMethod(data._id)}
              sx={{ cursor: "pointer" }}
            >
              <FormControlLabel
                value={data._id}
                control={<Radio />}
                label={data.name}
                checked={data._id === pmMethod}
              />
              <Box display="flex">
                {data.image.map((image, index) => (
                  <Image
                    key={index}
                    alt={data.name}
                    src={image}
                    width={100}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                ))}
              </Box>
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
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

export default Checkout;
