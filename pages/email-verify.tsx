import Loader from "@/components/Loader";
import ProjectLink from "@/components/ProjectLink";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function EmailVerify() {
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { token } = router.query;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (token) {
      try {
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_KEY}/users/verify/email`,
            {},
            {
              headers: {
                "x-auth-token": `${token}`,
              },
            }
          )
          .then((res) => {
            if (res.data.status == "3") {
              setLoader(false);
            }
          });
      } catch (error) {
        alert("Something went wrong please try again");
      }
    }
  }, [token]);

  if (loader) {
    return <Loader />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {!user ? (
        <>
          <Typography>
            Thank you for veryfing your email you can now procced to login page
          </Typography>
          <ProjectLink text="Go to Login" to="/login" color="blue" />
        </>
      ) : (
        <>
          <Typography>You have successfully verified your email!</Typography>
          <ProjectLink text="Continue Shopping" to="/shop" color="blue" />
        </>
      )}
    </Box>
  );
}

export default EmailVerify;

EmailVerify.noLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
