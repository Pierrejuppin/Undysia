import CorrectionTool from "./components/CorrectionTool";
import Footer from "./components/Footer";
import HeroHeader from "./components/HeroHeader";

export default function Home() {
  return (
    <main className="bg-background w-screen flex flex-col justify-center items-center">
      <HeroHeader />
      <CorrectionTool />
      <Footer />
    </main>
  );
}
