import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import json from "../../services/stackoverflow/my-top-answer-tags.json";
import { BubblesScreen } from "./BubblesScreen";

/**
 * @jest-environment jsdom
 */

describe("BubblesScreen", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<BubblesScreen tags={json.items}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("can select and deselect parent groups", () => {
    render(<BubblesScreen tags={json.items}/>);
    // choosing these names because they are parents only
    // need a good way to distinguish
    const backend = screen.getByRole("treeitem", {
      name: /backend/i,
      level: 1,
    });
    const react = screen.getByRole("treeitem", {
      name: /^react$/i,
      level: 1,
    });
    expect(react).toHaveAttribute("aria-expanded", false);
    expect(backend).toHaveAttribute("aria-expanded", false);

    userEvent.click(backend);
    expect(react).toHaveAttribute("aria-expanded", false);
    expect(backend).toHaveAttribute("aria-expanded", true);

    userEvent.click(react);
    expect(react).toHaveAttribute("aria-expanded", true);
    expect(backend).toHaveAttribute("aria-expanded", false);

    // TODO: how to select correct target elements?
  });
});
