import Header from "@/shared/header";
import TabMenu from "@/shared/tabs";
import React from "react";

const ClientLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <TabMenu />
    </>
  );
};

export default ClientLayout;
