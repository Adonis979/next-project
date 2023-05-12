import { AuthContextProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Montserrat } from "@next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    h1: {
      fontSize: "36px",
      fontWeight: 600,
      lineHeight: "36px",
      textTransform: "uppercase",
      "::selection": {
        backgroundColor: "#ef3e33",
        color: "white",
      },
      "@media (max-width: 599px)": {
        fontSize: "32px",
        lineHeight: "32px",
      },
    },
    h2: {
      fontSize: "36px",
      lineHeight: "44px",

      "@media (max-width: 599px)": {
        fontSize: "32px",
        lineHeight: "38px",
      },
    },
    h3: {
      fontSize: "24px",
      lineHeight: "30px",
      "@media (max-width: 599px)": {
        fontSize: "20px",
        lineHeight: "28px",
      },
    },
    h4: {
      fontSize: "22px",
      lineHeight: "30px",
      "@media (max-width: 599px)": {
        fontSize: "18px",
        lineHeight: "24px",
      },
    },
    subtitle1: {
      fontSize: "18px",
      lineHeight: "24px",
      "@media (max-width: 599px)": {
        fontSize: "15px",
        lineHeight: "18px",
      },
    },
    subtitle2: {
      fontSize: "16px",
      lineHeight: "20px",
      "@media (max-width: 599px)": {
        fontSize: "13px",
        lineHeight: "16px",
      },
    },
    caption: {
      fontSize: "14px",
      lineHeight: "20px",
      "@media (max-width: 599px)": {
        fontSize: "13px",
        lineHeight: "16px",
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // check if the current pathname is one of the pages without the layout
  const isNoLayoutPage = ["/login", "/sign-up"].includes(router.pathname);

  return (
    <AuthContextProvider>
      {isNoLayoutPage ? (
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      ) : (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </React.Fragment>
      )}
    </AuthContextProvider>
  );
}
