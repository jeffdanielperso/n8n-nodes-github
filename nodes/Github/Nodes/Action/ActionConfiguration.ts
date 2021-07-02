import {
  INodeProperties,
  INodePropertyCollection,
  INodePropertyOptions
} from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { ActionIssueConfiguration, ActionIssueOperationOptions } from "./ActionConfiguration.issue";
import { ActionProjectConfiguration, ActionProjectOperationOptions } from "./ActionConfiguration.project";
import { ActionPropertyDisplay } from "./ActionEnums";
import { ActionIssueOperationMapping } from "./ActionOperationMapping.issue";
import { ActionProjectOperationMapping } from "./ActionOperationMapping.project";

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

const ActionOperationOptions: Array<INodePropertyOptions | INodeProperties | INodePropertyCollection> = [
  ...ActionIssueOperationOptions,
  ...ActionProjectOperationOptions
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
  },
  [Property.Operation]: {
    ...ActionElementBase,
    displayName: PropertyDisplay.Operation,
    name: Property.Operation,
    description: ActionPropertyDisplay.OperationDescription,
    type: NodeTypes.Options,
    options: ActionOperationOptions,
  }
}

export const ActionConfiguration: INodeProperties[] = [
  ActionConfig[Property.Resource],
  ActionConfig[Property.Operation],
  ...ActionIssueConfiguration,
  ...ActionProjectConfiguration
]