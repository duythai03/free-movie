import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({ children }) {
  return (
    <div className="overflow-hidden min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
