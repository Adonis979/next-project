import Head from "next/head";
import { Box } from "@mui/material";
import Text from "@/components/HomePage/Text";
import Image from "next/image";
import MetaData from "@/components/MetaData";

export default function Home() {
  return (
    <>
      <MetaData text="Home" />
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
            mt: { xs: "20px", md: "0px" },
            zIndex: 999,
          }}
        >
          <Text />
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            width: { xs: "100%", md: "70%" },
            height: "100%",
            bottom: 0,
            right: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/maskGroup1.png"
            alt="grerzat"
            fill
            objectFit="cover"
          ></Image>
        </Box>
      </Box>
    </>
  );
}
