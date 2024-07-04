"use client";

import Image from "next/image";

const HeroHeader = () => {
  return (
    <>
      <Image
        src="/UNDYSIA.png"
        alt="logo"
        width={300}
        height={150}
        className="absolute"
      />
      <div className=" text-center flex flex-col md:flex-row justify-center items-center max-w md:pt-24 pt-48">
        <p className="py-6 text-2xl text-left italic font-thin text-text w-96 md:mx-32">
          Bienvenue sur <span className="text-primary text-2xl">UNDYSIA </span>
          votre solution de rédaction {"\n"}adapté aux personnes dyslexiques{" "}
          {"\n"}
          et malvoyantes. {"\n"}
          Nous vous aidons dans la{"\n"}
          rédaction de vos CV{"\n"} et lettres de motivation.
        </p>
        <div className="relative top-[200px] right-[350px]">
          <section id="section10" class="demo">
            <h1>Scroll Down Button #10</h1>
            <a href="#thanks">
              <span></span>Scroll
            </a>
          </section>
        </div>
        <Image src="/home.jpeg" alt="home" width={500} height={500} />
      </div>
    </>
  );
};

export default HeroHeader;
