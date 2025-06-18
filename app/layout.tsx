"use client";
// import type { Metadata } from "next";
import React, { useEffect } from "react";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Header from "@/shared/header";
import TabMenu from "@/shared/tabs";
import { usePathname } from "next/navigation";
import { Alert } from "@/components/ui/alert";

import { loadUser } from "@/redux/actions/authActions";

// export const metadata: Metadata = {
//   title: "Jazaro",
//   description: "Created with jazaro",
//   generator: "jazaro",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          <Alert />
          {children}
          <TabMenu />
        </Provider>
      </body>
    </html>
  );
}
