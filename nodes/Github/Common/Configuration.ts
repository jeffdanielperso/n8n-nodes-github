import { INodePropertyOptions } from "n8n-workflow";
import { NodeTypes, PropertyDisplay, YesNo } from "./Enums";

export const NodeMain = 'main';
export const NodeColor = '#1A82e2';
export const NodeGroup = 'transform';
export const NodeIcon = 'file:github.svg';

export const CollectionNodeName = 'parameter';
export const CollectionNodeItemName = 'value';
export const CollectionNodeItemType = NodeTypes.String;

export const YesNoOptions: INodePropertyOptions[] = [
  {
    name: PropertyDisplay.Yes,
    value: YesNo.Yes
  },
  {
    name: PropertyDisplay.No,
    value: YesNo.No
  }
]
