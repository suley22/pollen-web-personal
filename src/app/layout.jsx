import { Sora, Poppins } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Pollen - Find where you belong",
  description:
    "Discover your strengths and connect with inclusive employers who look beyond the CV.",
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${sora.variable} ${poppins.variable} antialiased`}>
        <Providers user={{ user }}>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
