import React from "react";
import { Header } from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
    </>
  );
};

export { Layout };
