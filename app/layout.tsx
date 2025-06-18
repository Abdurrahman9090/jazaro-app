"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Header from "@/shared/header";
import TabMenu from "@/shared/tabs";

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
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          {children}
          <TabMenu />
        </Provider>
      </body>
    </html>
  );
}
