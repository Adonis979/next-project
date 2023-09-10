import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { authenticateFunction } from "@/utils/sendCredentials";
import axios from "axios";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useCookies } from "react-cookie";

function Success() {
  const router = useRouter();
  const { payment, paymentId, PayerID } = router.query;
  const [loader, setLoader] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const { getUser } = useAuth();

  const getStatusOfPayment = async () => {
    const subscriptionPlan = localStorage.getItem("subscriptionPlan");
    if (payment === "paypal") {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/payment/paypal/status`,
          {
            payerId: PayerID,
            paymentId: paymentId,
            item_id: subscriptionPlan,
          },
          authenticateFunction(cookie)
        );
        getUser();
        setLoader(false);
        localStorage.removeItem("subscriptionPlan");
        localStorage.setItem("token", cookie.token);
        removeCookie("token");
      } catch (error) {
        console.log(error);
      }
    } else if (payment === "stripe") {
      localStorage.removeItem("subscriptionPlan");
      setLoader(false);
      removeCookie("token", { path: "/" });
    }
  };

  useEffect(() => {
    getStatusOfPayment();
  }, [payment]);

  if (loader) {
    return <Loader />;
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Box sx={{ position: "relative" }} width="100%" height="100%">
        <Image
          alt="success-payment"
          src={"/images/payment-successful.png"}
          style={{ objectFit: "scale-down" }}
          fill
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        alignItems="center"
        mb="50px"
      >
        <Typography variant="subtitle1" color="green">
          Thank you, your subscription has successfully finished. You are now a
          business
        </Typography>
        <Button variant="contained" onClick={() => router.push("/add-product")}>
          Add your first listing
        </Button>
      </Box>
    </Container>
  );
}

export default Success;
