import {
  INodeProperties,
  INodePropertyOptions
} from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { ActionIssueConfiguration, ActionIssueOperationOptions } from "./ActionConfiguration.issue";
import { ActionProjectConfiguration, ActionProjectOperationOptions } from "./ActionConfiguration.project";
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

export const ActionElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.String,
  default: '',
  required: true
}

const ActionConfig: IConfigurationMap = {
  [Property.Resource]: {
    ...ActionElementBase,
    displayName: PropertyDisplay.Resource,
    name: Property.Resource,
    description: ActionPropertyDisplay.ResourceDescription,
    type: NodeTypes.Options,
    options: ActionResourceOptions,
    default: Resource.Issue
  }
}

export const ActionConfiguration: INodeProperties[] = [
  ActionConfig[Property.Resource],
  ...ActionIssueConfiguration,
  ...ActionProjectConfiguration
]
