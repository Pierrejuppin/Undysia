"use client";

export default function Footer() {
  return (
    <div className="flex justify-evenly  w-full h-24 mt-4 bg-primary">
      <div className="dropdown dropdown-top my-auto">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-background text-primary hover:text-text hover:bg-bh"
        >
          Ils recherchent toujours une alternance
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-primary text-text hover:bg-bh rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a href="https://portfolio-pi-roan-98.vercel.app/" target="_blank">
              Hippolyte Weber
            </a>
          </li>
          <li>
            <a
              href="https://react-portfolio-eosin-six.vercel.app/"
              target="_blank"
            >
              Pierre Jupin
            </a>
          </li>
          <li>
            <a
              href="https://portfolio-react-michael-lelu-v1.vercel.app/"
              target="_blank"
            >
              Michaël Lelu
            </a>
          </li>
          <li>
            <a href="https://yann-duhamel.fr" target="_blank">
              Yann Duhamel
            </a>
          </li>
        </ul>
      </div>
      <p className="my-auto">
        L&apos;outil proposé par Undysia utilise la technologie{" "}
        <a
          href="https://openai.com"
          target="_blank"
          className="text-text hover:font-bold underline"
        >
          Open AI
        </a>
      </p>
    </div>
  );
}
