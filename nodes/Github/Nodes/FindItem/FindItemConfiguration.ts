import { IDisplayOptions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { FindItemProperty, FindItemPropertyDisplay } from "./FindItemEnums";

const FindItemDisplayOptions: IDisplayOptions = {
  show: {
    [Property.Resource]: [
      Resource.Project
    ]
  }
}

const FindItemResourceOptions: INodePropertyOptions[] = [
  {
    name: PropertyDisplay.Project,
    value: Resource.Project,
    description: FindItemPropertyDisplay.ProjectDescription
  }
]

const FindItemProjectOperationOptions: INodePropertyOptions[] = [
  {
    name: FindItemPropertyDisplay.ByProjectId,
    value: FindItemProperty.ProjectId,
    description: FindItemPropertyDisplay.ByProjectIdDescription
  },
  {
    name: FindItemPropertyDisplay.ByColumnId,
    value: FindItemProperty.ColumnId,
    description: FindItemPropertyDisplay.ByColumnIdDescription
  }
]

const FintItemConfigElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.Number,
  default: '',
  displayOptions: FindItemDisplayOptions,
  required: true
}

const FindItemConfig: IConfigurationMap = {
  [Property.Resource]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.Resource,
    name: Property.Resource,
    description: FindItemPropertyDisplay.ResourceDescription,
    displayOptions: {},
    type: NodeTypes.Options,
    options: FindItemResourceOptions
  },
  [Property.Operation]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.Operation,
    name: Property.Operation,
    description: FindItemPropertyDisplay.OperationDescription,
    type: NodeTypes.Options,
    options: FindItemProjectOperationOptions
  },
  [FindItemProperty.ProjectId]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.ProjectId,
    name: FindItemProperty.ProjectId,
    description: PropertyDisplay.ProjectId,
    displayOptions: {
      ...FindItemDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemProperty.ProjectId
        ]
      }
    }
  },
  [FindItemProperty.ColumnId]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.ProjectColumnId,
    name: FindItemProperty.ColumnId,
    description: PropertyDisplay.ProjectColumnId,
    displayOptions: {
      ...FindItemDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemProperty.ColumnId
        ]
      }
    }
  }
}

export const FindItemConfiguration: INodeProperties[] = [
  FindItemConfig[Property.Resource],
  FindItemConfig[Property.Operation],
  FindItemConfig[FindItemProperty.ProjectId],
  FindItemConfig[FindItemProperty.ColumnId],
]
