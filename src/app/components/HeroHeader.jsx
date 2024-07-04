"use client";

import Image from "next/image";

const HeroHeader = () => {
  return (
    <>
      <Image src="/UNDYSIA.png" alt="logo" width={250} height={100} />
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p className="py-6 text-left italic font-thin text-text">
            Bienvenue sur <span className="text-primary">UNDYSIA </span>votre
            solution de rédaction {"\n"}adapté aux personnes dyslexiques {"\n"}
            et malvoyantes {"\n"}
            vous permettant de corriger vos différentes {"\n"}rédactions CV,
            Lettre de motivation et de les{"\n"} télécharger au format PDF
          </p>
          <Image src="/home.jpeg" alt="home" width={500} height={500} />
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
