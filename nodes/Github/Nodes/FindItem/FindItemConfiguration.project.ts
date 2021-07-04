import { IDisplayOptions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../../Common/Enums";
import { IConfigurationMap } from "../../Common/Interfaces";
import { FindItemPropertyDisplay } from "./FindItemEnums";
import { FindItemProjectOperation, FindItemProjectProperty, FindItemProjectPropertyDisplay } from "./FindItemEnums.project";

const FindItemProjectDisplayOptions: IDisplayOptions = {
  show: {
    [Property.Resource]: [
      Resource.Project
    ]
  }
}

const FindItemProjectOperationOptions: INodePropertyOptions[] = [
  {
    name: FindItemProjectPropertyDisplay.ByProjectId,
    value: FindItemProjectOperation.ByProjectId,
    description: FindItemProjectPropertyDisplay.ByProjectIdDescription
  },
  {
    name: FindItemProjectPropertyDisplay.ByColumnId,
    value: FindItemProjectOperation.ByColumnId,
    description: FindItemProjectPropertyDisplay.ByColumnIdDescription
  }
]

const FintItemConfigElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.Number,
  default: '',
  required: true
}

const FindItemProjectConfig: IConfigurationMap = {
  [Property.Operation]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.Operation,
    name: Property.Operation,
    description: FindItemPropertyDisplay.OperationDescription,
    displayOptions: FindItemProjectDisplayOptions,
    type: NodeTypes.Options,
    options: FindItemProjectOperationOptions,
    default: FindItemProjectOperation.ByProjectId
  },
  [FindItemProjectProperty.ProjectId]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.ProjectId,
    name: FindItemProjectProperty.ProjectId,
    description: PropertyDisplay.ProjectId,
    displayOptions: {
      ...FindItemProjectDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemProjectOperation.ByProjectId
        ]
      }
    }
  },
  [FindItemProjectProperty.ColumnId]: {
    ...FintItemConfigElementBase,
    displayName: PropertyDisplay.ProjectColumnId,
    name: FindItemProjectProperty.ColumnId,
    description: PropertyDisplay.ProjectColumnId,
    displayOptions: {
      ...FindItemProjectDisplayOptions,
      show: {
        [Property.Operation]: [
          FindItemProjectOperation.ByColumnId
        ]
      }
    }
  }
}

export const FindItemProjectConfiguration: INodeProperties[] = [
  FindItemProjectConfig[Property.Operation],
  FindItemProjectConfig[FindItemProjectProperty.ProjectId],
  FindItemProjectConfig[FindItemProjectProperty.ColumnId]
]
