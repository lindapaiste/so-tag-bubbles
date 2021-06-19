import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { TagBadgeBox } from "./TagBadge";

/**
 * @jest-environment jsdom
 */

describe("TagBadge", () => {
  it("contains the tag name and award count", () => {
    render(
      <TagBadgeBox rank="bronze" tag_name="typescript" award_count={99} />
    );
    expect(screen.queryByText("typescript")).toBeInTheDocument();
    expect(screen.queryByText("99")).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <TagBadgeBox rank="bronze" tag_name="typescript" award_count={99} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // mostly including this for the coverage report re: branches
  it("can handle unknown tags", () => {
    render(
      <TagBadgeBox rank="silver" tag_name="not-covered" award_count={10} />
    );
    expect(screen.queryByText("not-covered")).toBeInTheDocument();
    expect(screen.queryByText("10")).toBeInTheDocument();
  });
});
