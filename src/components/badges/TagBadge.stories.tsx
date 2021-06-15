import React from "react";
import { Story } from "@storybook/react";
import { TagBadgeBox, TagBadgeProps } from "./TagBadge";

export default {
  title: "Badge/Tag Badge",
  component: TagBadgeBox,
};

const Template: Story<TagBadgeProps> = (args) => <TagBadgeBox {...args} />;

export const SilverTypescript = Template.bind({});
SilverTypescript.args = {
  tag_name: "typescript",
  rank: "silver",
  award_count: 80,
};

export const BronzeRedux = Template.bind({});
BronzeRedux.args = {
  tag_name: "redux",
  rank: "bronze",
  award_count: 9999,
};

export const GoldUnknown = Template.bind({});
GoldUnknown.args = {
  tag_name: "some-tag",
  rank: "gold",
  award_count: 25,
};
