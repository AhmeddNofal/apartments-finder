import type { Metadata } from "next";
import "./globals.css";
import ThemeProviders from "./themeProviders";
import AppHeader from "./_components/common/appHeader";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Apartments App",
  description: "Demo Task for Nawy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <ThemeProviders>
          <AppHeader />
            {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
