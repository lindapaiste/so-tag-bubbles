import React from "react";
import { Story } from "@storybook/react";
import { BadgeMedal, TagBadgeProps } from "./TagBadge";

export default {
  title: "Badge/Tag Badge",
  component: BadgeMedal,
};

const Template: Story<TagBadgeProps> = (args) => <BadgeMedal {...args} />;

export const SilverTypescript = Template.bind({});
SilverTypescript.args = {
  tag_name: "typescript",
  rank: "silver",
};

export const BronzeRedux = Template.bind({});
BronzeRedux.args = {
  tag_name: "redux",
  rank: "bronze",
};
