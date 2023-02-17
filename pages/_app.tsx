import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <React.Fragment>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </React.Fragment>
    </AuthContextProvider>
  );
}
