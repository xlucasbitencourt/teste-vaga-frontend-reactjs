import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Cursos",
  description: "Lucas Bitencourt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} flex flex-col gap-4 justify-center items-center w-full sm:w-[80%] lg:w-[70%] mx-auto my-4`}
      >
        {children}
      </body>
    </html>
  );
}
