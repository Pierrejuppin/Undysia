"use client";

import Image from "next/image";

const HeroHeader = () => {
  return (
    <div className="flex justify-center hero min-h-screen mb-44">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p className="py-6 text-left italic font-thin">
            Bienvenue sur <span className="text-primary">UNDYSIA </span>votre
            solution de rédaction {"\n"}adapté aux personnes dyslexiques {"\n"}
            et malvoyantes {"\n"}
            vous permettant de corriger vos différentes {"\n"}rédactions CV,
            Lettre de motivation et de les{"\n"} télécharger au format PDF
          </p>
          <Image
            src="/home.jpeg"
            alt="home"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
