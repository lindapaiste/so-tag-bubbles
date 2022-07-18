import { FC } from "react";
import clsx from "clsx";
import { ProjectStub } from "./ProjectStub";

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
        tech={[
          "ts",
          "react",
          "reactRouter",
          "mui",
          "chroma",
          "redux",
          "lodash",
          "geometric",
          "cra",
          "rewired",
          "vercel",
          "storybook",
          "eslint",
          "prettier",
          "jest",
          "testingLibrary",
        ]}
      />
      <ProjectStub
        url="https://pets.lindapaiste.com"
        title="Adoptable Pet Search"
        tech={[
          "antd",
          "less",
          "lodash",
          "slick",
          "react",
          "redux",
          "reactRouter",
          "ts",
          "eslint",
          "prettier",
          "testingLibrary",
          "jest",
          "cra",
          "craco",
        ]}
      />
      <ProjectStub
        url="https://snake.lindapaiste.com"
        title="Snake Game"
        tech={["reactNative", "expo", "ts", "gesture"]}
      />
      <ProjectStub
        url="https://color.lindapaiste.com"
        title="Color Analysis"
        tech={[
          "react",
          "reactRouter",
          "mui",
          "vercel",
          "lodash",
          "table",
          "chroma", // also: color-convert, delta-e, hsluv
          "recharts",
          "simpleStatistics",
          "tfjs",
          "eslint",
          "prettier",
          "ts",
          "cra",
          "jest",
          "testingLibrary",
        ]}
      />
    </ul>
  </div>
);
