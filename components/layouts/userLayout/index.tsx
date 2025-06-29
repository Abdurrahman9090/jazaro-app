import Alert from "@/components/Alert";
import MobileDrawer from "@/shared/drawer";
import Header from "@/shared/header";
import TabMenu from "@/shared/tabs";
import React, { useState } from "react";

const ClientLayout = ({ children }: any) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <Alert />
      {children}
      <MobileDrawer open={isDrawerOpen} setOpen={() => setDrawerOpen(false)} />
      <TabMenu />
    </div>
  );
};

export default ClientLayout;
