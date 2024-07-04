"use client";
import { useEffect } from "react";
import CorrectionTool from "./components/CorrectionTool";
import Footer from "./components/Footer";
import HeroHeader from "./components/HeroHeader";
import "aos/dist/aos.css";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <main className="bg-background md:w-screen  justify-center items-center">
      <HeroHeader />
      <div className="flex flex-col  justify-center items-center w-screen mt-48">
        <CorrectionTool />
        <Footer />
      </div>
    </main>
  );
}
