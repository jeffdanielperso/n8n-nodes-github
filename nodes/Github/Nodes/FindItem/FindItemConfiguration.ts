import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { FindItemIssueConfiguration } from "./FindItemConfiguration.issue";
import { FindItemProjectConfiguration } from "./FindItemConfiguration.project";
import { FindItemPropertyDisplay } from "./FindItemEnums";

const FindItemResourceOptions: INodePropertyOptions[] = [
  {
    name: PropertyDisplay.Project,
    value: Resource.Project,
    description: FindItemPropertyDisplay.ProjectDescription
  },
  {
    name: PropertyDisplay.Issue,
    value: Resource.Issue,
    description: FindItemPropertyDisplay.IssueDescription
  }
]

const FindItemConfig: IConfigurationMap = {
  [Property.Resource]: {
    displayName: PropertyDisplay.Resource,
    name: Property.Resource,
    description: FindItemPropertyDisplay.ResourceDescription,
    type: NodeTypes.Options,
    options: FindItemResourceOptions,
    default: Resource.Project,
    required: true
  }
}

export const FindItemConfiguration: INodeProperties[] = [
  FindItemConfig[Property.Resource],
  ...FindItemProjectConfiguration,
  ...FindItemIssueConfiguration
]
