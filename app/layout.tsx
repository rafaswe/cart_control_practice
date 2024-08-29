import { ReactNode } from "react";
import "./globals.css";
type RootLayoutProps = {
  children: ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Purchase Goods</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="flex w-full bg-white justify-between">{children}</body>
    </html>
  );
}
