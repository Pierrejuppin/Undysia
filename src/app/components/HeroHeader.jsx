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
          Bienvenue sur <span className="text-primary">UNDYSIA </span>votre
          solution de rédaction {"\n"}adapté aux personnes dyslexiques {"\n"}
          et malvoyantes {"\n"}
          vous permettant de corriger vos différentes {"\n"}rédactions CV,
          Lettre de motivation et de les{"\n"} télécharger au format PDF
        </p>

        <Image src="/home.jpeg" alt="home" width={500} height={500} />
      </div>
    </>
  );
};

export default HeroHeader;
