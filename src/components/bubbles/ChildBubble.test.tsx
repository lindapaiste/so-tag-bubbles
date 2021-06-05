import renderer from "react-test-renderer";
import React from "react";
import { ChildBubble } from "./ChildBubble";

const node = {
  x: 100,
  y: 100,
  r: 100,
  data: {
    tag_name: "react_redux",
    answer_score: 120,
    answer_count: 80,
  },
};

describe("ChildBubble", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ChildBubble colorValue={1} node={node} isActive={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("appears and disappears", () => {
    // TODO: is based on CSS classname on the parent
  });

  it("hides details by default", () => {});

  it("shows and hides tag details", () => {
    // TODO: test response to a click -- this requires that it be rendered inside a ParentBubble
  });
});
