import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ChildBubble } from "./ChildBubble";
import "../../config/global.scss";

/**
 * @jest-environment jsdom
 */

const node = {
  x: 100,
  y: 100,
  r: 100,
  data: {
    tag_name: "redux",
    answer_score: 120,
    answer_count: 80,
  },
};

describe("ChildBubble", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ChildBubble
          colorValue={1}
          node={node}
          isActive={true}
          isSelected={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("is visible when isSelected={true}", () => {
    render(
      <ChildBubble
        colorValue={1}
        node={node}
        isActive={false}
        isSelected={true}
      />
    );
    expect(
      screen.getByRole("treeitem", {
        name: /redux/i,
      })
    ).toHaveClass("scale-1");
  });

  it("is hidden when isSelected={false}", () => {
    render(
      <ChildBubble
        colorValue={1}
        node={node}
        isActive={false}
        isSelected={false}
      />
    );
    expect(
      screen.getByRole("treeitem", {
        name: /redux/i,
      })
    ).toHaveClass("scale-0");
  });

  it("hides details when isActive={false}", () => {
    render(
      <ChildBubble
        colorValue={1}
        node={node}
        isActive={false}
        isSelected={true}
      />
    );
    expect(screen.getByText("Answers")).not.toBeVisible();
  });

  it("shows details when isActive={true}", () => {
    render(
      <ChildBubble
        colorValue={1}
        node={node}
        isActive={true}
        isSelected={true}
      />
    );
    expect(screen.getByText("Answers")).toBeVisible();
  });

  it("shows and hides tag details", () => {
    // TODO: test response to a click -- this requires that it be rendered inside a ParentBubble
  });
});
