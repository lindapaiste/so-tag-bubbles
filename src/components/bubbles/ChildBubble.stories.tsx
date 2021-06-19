import { Meta, Story } from "@storybook/react";
import { ChildBubble } from "./ChildBubble";

export default {
  title: "Bubble/ChildBubble",
  component: ChildBubble,
  argTypes: {},
  args: {
    colorValue: 1.5,
    r: 100,
    answer_score: 10,
    answer_count: 5,
    tag_name: "react-redux",
    isSelected: true,
  },
} as Meta;

interface Props {
  r: number;
  tag_name: string;
  answer_count: number;
  answer_score: number;
  isActive: boolean;
  isSelected: boolean;
  colorValue: number;
}

const Template: Story<Props> = ({
  r,
  answer_count,
  answer_score,
  isActive,
  isSelected,
  tag_name,
  colorValue,
}: Props) => (
  <ChildBubble
    node={{
      x: r,
      y: r,
      r,
      data: {
        answer_count,
        answer_score,
        tag_name,
      },
    }}
    colorValue={colorValue}
    isActive={isActive}
    isSelected={isSelected}
  />
);

export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
};
