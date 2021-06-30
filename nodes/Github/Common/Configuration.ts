import { INodeProperties } from "n8n-workflow";
import { Property, PropertyDisplay, Resource } from "./Enums";

export const NodeIcon = 'file:github.svg';

export const ConfigResource: INodeProperties = {
  displayName: PropertyDisplay.Resource,
  name: Property.Resource,
  type: 'options',
  options: [
    {
      name: PropertyDisplay.Issue,
      value: Resource.Issue,
    },
    {
      name: PropertyDisplay.Project,
      value: Resource.Project
    }
  ],
  default: Resource.Issue,
  required: true,
  description: PropertyDisplay.Resource
}
