import { FC, ReactNode } from "react";
import {
  SiAntdesign,
  SiD3Dotjs,
  SiEslint,
  SiExpo,
  SiJest,
  SiLess,
  SiLodash,
  SiMaterialui,
  SiMetro,
  SiReact,
  SiReactrouter,
  SiReacttable,
  SiRedux,
  SiStorybook,
  SiTailwindcss,
  SiTensorflow,
  SiTestinglibrary,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";
import {
  TbBrandNextjs,
  TbBrandVercel,
  TbChartBar,
  TbHexagons,
} from "react-icons/tb";
import { MdSlideshow, MdTouchApp } from "react-icons/md";
import { sortBy } from "lodash";
import { VscSymbolColor } from "react-icons/vsc";
import { BiStats } from "react-icons/bi";
import { BsEject, BsPlug } from "react-icons/bs";
import clsx from "clsx";

const TECH_MAP = {
  // core
  react: { icon: <SiReact />, label: "React.js" },
  reactNative: { icon: <SiReact />, label: "React Native" },
  redux: { icon: <SiRedux />, label: "Redux" },
  reactRouter: { icon: <SiReactrouter />, label: "React Router" },
  ts: { icon: <SiTypescript />, label: "TypeScript" },
  // ui & styling
  antd: { icon: <SiAntdesign />, label: "Ant Design" },
  mui: { icon: <SiMaterialui />, label: "MUI" },
  tailwind: { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  less: { icon: <SiLess />, label: "Less" },
  // build
  vercel: { icon: <TbBrandVercel />, label: "Vercel" },
  cra: { icon: <SiReact />, label: "Create React App" },
  craco: { icon: <BsEject />, label: "CRACO" },
  rewired: { icon: <BsPlug />, label: "React App Rewired" },
  next: { icon: <TbBrandNextjs />, label: "Next.js" },
  expo: { icon: <SiExpo />, label: "Expo" },
  metro: { icon: <SiMetro />, label: "Metro" },
  webpack: { icon: <SiWebpack />, label: "Webpack" },
  // tools
  eslint: { icon: <SiEslint />, label: "ESLint" },
  prettier: { icon: <SiEslint />, label: "Prettier" },
  jest: { icon: <SiJest />, label: "Jest" },
  testingLibrary: { icon: <SiTestinglibrary />, label: "Testing Library" },
  storybook: { icon: <SiStorybook />, label: "Storybook" },
  // misc
  slick: { icon: <MdSlideshow />, label: "Slick Carousel" },
  lodash: { icon: <SiLodash />, label: "Lodash" },
  table: { icon: <SiReacttable />, label: "React Table" },
  d3: { icon: <SiD3Dotjs />, label: "D3.js" },
  chroma: { icon: <VscSymbolColor />, label: "Chroma.js" },
  recharts: { icon: <TbChartBar />, label: "Recharts" },
  simpleStatistics: { icon: <BiStats />, label: "Simple Statistics" },
  tfjs: { icon: <SiTensorflow />, label: "TensorFlow" },
  gesture: { icon: <MdTouchApp />, label: "Gesture Handler" },
  geometric: { icon: <TbHexagons />, label: "Geometric" },
};

export type TechKey = keyof typeof TECH_MAP;

export interface TechProps {
  icon?: ReactNode;
  label: string;
}

const TechTag: FC<TechProps> = ({ icon, label }) => (
  <div className="flex items-center m-1 rounded-md p-2 bg-gray-100 shadow-sm">
    <div className="w-1/3 flex justify-center">{icon}</div>
    <span className="whitespace-nowrap">{label}</span>
  </div>
);

interface TechListProps {
  tech: TechKey[];
  isOpen: boolean;
}

const ITEM_HEIGHT = 56;

export const TechList: FC<TechListProps> = ({ tech, isOpen }) => {
  const list = tech.map<TechProps>((name) => TECH_MAP[name]).filter(Boolean);
  return (
    <div
      className={clsx("transition-height duration-500")}
      style={{ height: isOpen ? ITEM_HEIGHT * tech?.length : 0 }}
    >
      <div
        className={clsx(
          isOpen ? "scale-y-100" : "scale-y-0",
          "transform origin-top transition-transform duration-500"
        )}
        style={{ transformOrigin: "top" }}
      >
        <ul>
          {sortBy(list, "label").map(({ icon, label }) => (
            <TechTag label={label} icon={icon} key={label} />
          ))}
        </ul>
      </div>
    </div>
  );
};
