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
      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer text-right hover:underline"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-base font-lora lowercase italic">Packages</span>
        <TbChevronRight
          className={clsx(
            "transition-transform transform inline text-xl",
            isOpen ? "rotate-90" : "rotate-0"
          )}
        />
      </div>
      <TechList tech={tech} isOpen={isOpen} />
    </li>
  );
};
