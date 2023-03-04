import { AuthContextProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // check if the current pathname is one of the pages without the layout
  const isNoLayoutPage = ["/login", "/sign-up"].includes(router.pathname);

  return (
    <AuthContextProvider>
      {isNoLayoutPage ? (
        <Component {...pageProps} />
      ) : (
        <React.Fragment>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      )}
    </AuthContextProvider>
  );
}
