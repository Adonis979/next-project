import React from "react";
import Footer from "./Footer";
import Header from "./Header/Header";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <header>
        <Header />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
