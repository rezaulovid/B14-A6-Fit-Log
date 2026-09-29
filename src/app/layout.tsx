import type { Metadata } from "next";
import "./globals.css";

import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Your workout planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />

          {children}

          <Footer />

          <ToastContainer
            position="top-right"
            autoClose={2000}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}


