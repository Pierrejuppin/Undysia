import CorrectionTool from "./components/CorrectionTool";
import Footer from "./components/Footer";
import HeroHeader from "./components/HeroHeader";

export default function Home() {
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
