"use client";
// import type { Metadata } from "next";
import React, { useEffect } from "react";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { loadUser } from "@/redux/actions/authAction";

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
