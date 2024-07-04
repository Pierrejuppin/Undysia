import { Inter } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
export const metadata = {
  title: "Undysia",
  description: "assistant de buereau pour les personnes dyslexiques",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
