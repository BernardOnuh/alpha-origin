import Image from "next/image";
import localFont from "next/font/local";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NFTMint from "@/components/NFTMint";
import Header from "@/components/Header";
import AlphaOrigin from "@/components/index"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div>
    <AlphaOrigin/>
    </div>
  );
}
