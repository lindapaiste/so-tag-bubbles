import clsx from "clsx";
import { FC } from "react";

/**
 * Just want to get these links up somewhere!
 * TODO: content
 */

interface ProjectProps {
  url: string;
  title: string;
}

export const ProjectStub: FC<ProjectProps> = ({ url, title }) => (
  <li className="w-full my-4">
    <a
      href={url}
      className={clsx(
        "w-full block p-8 bg-white",
        "rounded-lg border-2 border-[#50d7cb] shadow-md",
        "hover:underline hover:bg-[#9bcdc80f]"
      )}
    >
      {title}
    </a>
  </li>
);

export const ProjectsList: FC = () => (
  <div
    className={clsx(
      "flex justify-center text-center",
      "font-benchnine font-bold text-3xl tracking-wide uppercase"
    )}
  >
    <ul className="flex flex-col items-stretch">
      <ProjectStub
        url="https://patterns.lindapaiste.com"
        title="Geometric Pattern Creator"
      />
      <ProjectStub
        url="https://pets.lindapaiste.com"
        title="Adoptable Pet Search"
      />
      <ProjectStub url="https://snake.lindapaiste.com" title="Snake Game" />
      <ProjectStub url="https://color.lindapaiste.com" title="Color Analysis" />
    </ul>
  </div>
);
