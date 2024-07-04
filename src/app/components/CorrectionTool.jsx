"use client";
import { ClipboardCopy } from "lucide-react";
import { Mic } from "lucide-react";
import { Pause } from "lucide-react";
import { Play } from "lucide-react";
import { ZoomIn } from "lucide-react";
import { ZoomOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
import FontSizeChanger from "react-font-size-changer";

const CorrectionForm = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [selectedVoice, setSelectedVoice] = useState();

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

  const handleSubmit = async (e, contentText) => {
    e.preventDefault();
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: contentText,
          },
        ],
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      const correctedText = data.choices[0].message.content;
      setResponse(correctedText);
    } catch (error) {
      console.error("Error fetching from ChatGPT API:", error);
    }
  };
  const mic = require("../../../public/mic.svg");
  return (
    <>
      {/* <h5 className="text-center mr-2 text-text">Régler la taille:</h5> */}
      <FontSizeChanger
        targets={["#target-one"]}
        customButtons={{
          up: <ZoomIn />,
          down: <ZoomOut />,
          style: {
            backgroundColor: "#472d30",
            color: "#ffe1a8",
            WebkitBoxSizing: "border-box",
            WebkitBorderRadius: "12px",
            width: "40px",
          },
          buttonsMargin: 5,
        }}
      />
      <div id="target-one" className="mb-24">
        <div className="flex justify-end mr-32">
          <button
            onClick={listening ? stop : listen}
            className="w-8 rounded-full bg-primary text-text border-2 border-text m-4 hover:bg-bh flex justify-center"
          >
            {listening ? (
              <Pause size={25} strokeWidth={1} />
            ) : (
              <Mic size={25} strokeWidth={1} />
            )}
          </button>
        </div>
        <form
          className="flex flex-col  justify-center items-center  "
          onSubmit={handleSubmit}
        >
          <textarea
            className="bg-primary rounded text-text p-4 focus:outline-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Entrez votre texte ici..."
            rows={10}
            cols={50}
          />
          <br />
        </form>
        <div className="flex flex-row justify-center">
          <button
            type="submit"
            onClick={(e) =>
              handleSubmit(
                e,
                `Corrige les fautes d'orthographe, de style et de conjugaisons dans sa langue actuelle : ${inputText}`
              )
            }
            className="w-32 mx-2 rounded bg-primary text-text border-2 border-black hover:bg-bh"
          >
            Corriger
          </button>
          <button
            type="submit"
            onClick={(e) =>
              handleSubmit(
                e,
                `Reformule ce texte pour un contexte profesionnel dans sa langue actuelle : ${inputText}`
              )
            }
            className="w-32 mx-2 rounded bg-primary text-text border-2 border-black hover:bg-bh"
          >
            Reformuler
          </button>
          <button
            type="submit"
            onClick={(e) =>
              handleSubmit(
                e,
                `Traduis le texte dans un anglais profesionnel : ${inputText}`
              )
            }
            className="w-32 mx-2 rounded bg-primary text-text border-2 border-black hover:bg-bh"
          >
            Traduire
          </button>
        </div>
        <div>
          <div className="mt-4">
            <div className="bg-primary text-text rounded p-4 relative w-[600px]">
              <h3>Réponse :</h3>
              <p className="max-w-full">{response}</p>
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="absolute top-0 right-0"
              >
                <ClipboardCopy
                  size={20}
                  color="#FFE1A8"
                  strokeWidth={0.75}
                  className="m-2"
                />
              </button>
            </div>
            <div className="flex flex-row justify-center items-center">
              <button
                onClick={() =>
                  speak({
                    text: response,
                    voice: voices.find((v) => v.voiceURI === selectedVoice),
                  })
                }
                className=" rounded-full bg-primary text-text border-2 border-text m-4 hover:bg-bh flex justify-center"
              >
                <Play size={25} strokeWidth={1} />
              </button>
              <button
                onClick={cancel}
                className=" rounded-full bg-primary text-text border-2 border-text m-4 hover:bg-bh flex justify-center"
              >
                <Pause size={25} strokeWidth={1} />
              </button>

              <label htmlFor="voiceSelect" className="mr-2 text-text">
                Choisir une voix :
              </label>
              <select
                id="voiceSelect"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="p-2 bg-primary text-text"
              >
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorrectionForm;
