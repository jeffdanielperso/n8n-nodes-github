import {
  INodeProperties,
  INodePropertyOptions
} from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { ActionIssueConfiguration } from "./ActionConfiguration.issue";
import { ActionProjectConfiguration } from "./ActionConfiguration.project";
import { ActionPropertyDisplay } from "./ActionEnums";

const ActionResourceOptions: INodePropertyOptions[] = [
  {
    name: PropertyDisplay.Issue,
    value: Resource.Issue,
    description: PropertyDisplay.Issue
  },
  {
    name: PropertyDisplay.Project,
    value: Resource.Project,
    description: PropertyDisplay.Project
  }
]

const ActionConfig: IConfigurationMap = {
  [Property.Resource]: {
    displayName: PropertyDisplay.Resource,
    name: Property.Resource,
    description: ActionPropertyDisplay.ResourceDescription,
    type: NodeTypes.Options,
    options: ActionResourceOptions,
    default: Resource.Issue,
    required: true
  }
}

export const ActionConfiguration: INodeProperties[] = [
  ActionConfig[Property.Resource],
  ...ActionIssueConfiguration,
  ...ActionProjectConfiguration
]
