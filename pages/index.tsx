import Head from "next/head";
import { Box } from "@mui/material";
import Text from "@/components/HomePage/Text";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Grerëzat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/grerzat.png" />
      </Head>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: { xs: "flex-start", md: "center" },
          height: "90vh",
          backgroundColor: "#FFF6F6",
          gap: "50px",
          paddingLeft: { xs: "20px", md: "75px" },
        }}
      >
        <Box
          sx={{
            width: { xs: "70%", md: "50%" },
            backgroundColor: "#FFF6F6",
            mt: { xs: "20px", md: "0px" },
          }}
        >
          <Text />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", md: "50%" },
            height: "70%",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Image src="/images/maskGroup1.png" alt="grerzat" fill></Image>
        </Box>
      </Box>
    </>
  );
}
