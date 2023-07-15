import { AuthContextProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // check if the current pathname is one of the pages without the layout
  const isNoLayoutPage = ["/login", "/sign-up", "/forgot-password"].includes(
    router.pathname
  );

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
