"use client";

import { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";

const CorrectionForm = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);

  const { speak, cancel, voices } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setInputText(result);
    },
  });

  useEffect(() => {
    if (voices.length > 0 && !selectedVoice) {
      setSelectedVoice(voices[0].voiceURI);
    }
  }, [voices, selectedVoice]);

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
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="bg-black text-white p-2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Entrez votre texte ici..."
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white">
          Corriger
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={listening ? stop : listen}
          className="mt-2 p-2 bg-blue-500 text-white"
        >
          {listening ? "Arrêter l'écoute" : "Utiliser le micro"}
        </button>
      </div>
      <div className="mt-4">
        <h3>Réponse :</h3>
        <p>{response}</p>
        <button
          onClick={() =>
            speak({
              text: response,
              voice: voices.find((v) => v.voiceURI === selectedVoice),
            })
          }
          className="mt-2 p-2 bg-blue-500 text-white"
        >
          Lire la réponse
        </button>
        <button
          onClick={cancel}
          className="mt-2 p-2 bg-red-500 text-white ml-2"
        >
          Arrêter
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="voiceSelect" className="mr-2">
          Choisir une voix :
        </label>
        <select
          id="voiceSelect"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="p-2 bg-white text-black"
        >
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CorrectionForm;
