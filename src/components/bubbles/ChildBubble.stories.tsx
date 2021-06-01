import React from "react";
import { Meta, Story } from "@storybook/react";
import "../components/bubbles/bubbles.css";
import { ChildBubble } from "./ChildBubble";
import { ZoomContext } from "./ZoomContext";
import json from "../../services/stackoverflow/my-top-answer-tags.json";
import { usePackLayout } from "../../services/d3/usePackLayout";

const BubbleDecorator = (Story: Story) => {
  const root = usePackLayout({
    width: 1000,
    height: 1000,
    count: 10,
    tags: json.items,
  });

  return (
    <ZoomContext.Provider value={1}>
      <Story node={root.children?.[0]?.children?.[0]} />
    </ZoomContext.Provider>
  );
};

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
  },
  decorators: [BubbleDecorator],
} as Meta;

interface Props {
  r: number;
  tag_name: string;
  answer_count: number;
  answer_score: number;
  isActive: boolean;
  colorValue: number;
}

const Template: Story<Props> = ({
  r,
  answer_count,
  answer_score,
  isActive,
  tag_name,
  colorValue,
  ...args
}: Props) => (
  <div className="container zoomed">
    <div className="group selected">
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
        {...args}
      />
    </div>
  </div>
);

export const Inactive = Template.bind({});
Inactive.args = {
  isActive: false,
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
};
