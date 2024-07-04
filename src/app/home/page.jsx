"use client";

import { useState } from "react";
<<<<<<< HEAD
import Image from "next/image";
=======
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
>>>>>>> f27e865bc7422b532d7b20796044f54386dbe474

const CorrectionForm = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const { speak } = useSpeechSynthesis();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setInputText(result);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Corrige l'orthographe, la grammaire, la syntaxe de ce texte : ${inputText}`,
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const correctedText = data.choices[0].message.content;
      setResponse(correctedText);
    } catch (error) {
      console.error("Error fetching from ChatGPT API:", error);
    }
  };

  return (
    <main className="bg-background w-screen flex flex-col justify-center items-center">
      <div className="flex justify-center hero min-h-screen mb-44">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="py-6 text-left italic font-thin">
              Bienvenu sur <span className="text-primary">UNDYSIA </span>votre
              solution de rédaction {"\n"}adapté aux personnes dyslexiques{" "}
              {"\n"}et malvoyantes {"\n"}
              vous permettant de corriger vos différentes {"\n"}rédactions CV,
              Lettre de motivation et de les{"\n"} télécharger au format PDF
            </p>
            <Image src="/home.jpeg" alt="home" width={500} height={500} />
          </div>
        </div>
      </div>
      <div>
        <form
          className="flex flex-col justify-center items-center my-14  mt-54"
          onSubmit={handleSubmit}
        >
          <textarea
            className="bg-primary rounded text-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Entrez votre texte ici..."
            rows={10}
            cols={50}
          />
          <br />
          <button
            type="submit"
            className="w-20 rounded bg-primary text-text border-2 border-black"
          >
            Corriger
          </button>
        </form>
        <div>
        <button
          onClick={listening ? stop : listen}
          className="mt-2 p-2 bg-blue-500 text-white"
        >
          {listening ? "Arrêter l'écoute" : "Utiliser le micro"}
        </button>
        <button
          onClick={() => speak({ text: response })}
          className="mt-2 p-2 bg-blue-500 text-white"
        >
          Lire la réponse
        </button>
          <h3>Résultat :</h3>
          <p className="mb-56">{response}</p>
        </div>
      </div>
    </main>
  );
};

export default CorrectionForm;
