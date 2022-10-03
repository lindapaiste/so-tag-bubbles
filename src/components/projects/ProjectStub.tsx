import clsx from "clsx";
import { FC, useState } from "react";
import { TbChevronRight } from "react-icons/tb";
import { TechKey, TechList } from "./Tech";

/**
 * Just want to get these links up somewhere!
 * TODO: content
 */

interface ProjectProps {
  url: string;
  title: string;
  tech?: TechKey[];
}

export const ProjectStub: FC<ProjectProps> = ({ url, title, tech = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="my-4 w-full">
      <a
        href={url}
        className={clsx(
          "block w-full bg-white p-8",
          "rounded-lg border-2 border-[#50d7cb] shadow-md",
          "hover:bg-[#9bcdc80f] hover:underline"
        )}
      >
        {title}
      </a>
      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer text-right hover:underline"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-lora text-base lowercase italic">Packages</span>
        <TbChevronRight
          className={clsx(
            "inline text-xl transition-transform",
            isOpen ? "rotate-90" : "rotate-0"
          )}
        />
      </div>
      <TechList tech={tech} isOpen={isOpen} />
    </li>
  );
};
