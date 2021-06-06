import { Meta, Story } from "@storybook/react";
import { ParentBubble } from "./ParentBubble";
import json from "../../services/stackoverflow/my-top-answer-tags.json";
import {
  prepareTags,
  TagData,
  TagNode,
  toSerializable,
} from "../../services/d3/usePackLayout";
import React from "react";
import * as d3 from "d3";
import { HierarchyCircularNode } from "d3";
import { PACK_LAYOUT_PADDING } from "../../config";

/**
 * Parent Bubble story gets it's nodes from the data, so it's less customizable.
 */
interface Props {
  isSelected: boolean;
  colorValue: number;
  node: TagNode;
}

const tags = prepareTags(json.items);
const layout = d3.pack<TagData>().size([400, 400]).padding(PACK_LAYOUT_PADDING);
const root = layout(tags);
const node = toSerializable(
  root.children?.[0] as HierarchyCircularNode<TagData>
);

export default {
  title: "Bubble/ParentBubble",
  component: ParentBubble,
  args: {
    isSelected: false,
    colorValue: 0.5,
    node,
  },
} as Meta;

const Template: Story<Props> = ({ isSelected, colorValue, node }: Props) => (
  <ParentBubble
    node={node}
    colorBasis={colorValue}
    isSelected={isSelected}
    select={() => undefined}
    deselect={() => undefined}
  />
);

export const Unselected = Template.bind({});
Unselected.args = {
  isSelected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  isSelected: true,
};
