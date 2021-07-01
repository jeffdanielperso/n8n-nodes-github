import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject, IDisplayOptions, INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { NodeTypes, Property, PropertyDisplay, Resource } from "../Common/Enums";
import { IConfigurationMap, IErrorResponse } from "../Common/Interfaces";
import { operationFindProjectByColumnId, operationFindProjectByProjectId } from "./FindItemOperations";
import { IFindItemBaseResponse, IFindItemErrorResponse } from "./FindItemResponse";

//#region Enums

export enum FindItemNode {
  Name = 'githubFindItem',
  DisplayName = 'Github Find Item',
  Description = 'Github Find Item',
  OutputName = 'github-find-item'
}

export enum FindItemPropertyDisplay {
  Operation = 'Parameter',
  OperationDescriptipn = 'Parameter',
  FindProject = 'Find Project',
  FindProjectDescription = 'Project to Find',
  ByProjectId = 'By Project ID',
  ByProjectIdDescription = 'Find by Project ID',
  ByColumnId = 'By Column ID',
  ByColumnIdDescription = 'Find by Column ID'
}

export enum FindItemProperty {
  ProjectId = 'findItem_projectId',
  ColumnId = 'findItem_columnId'
}

//#endregion

//#region Options

const FindItemDisplayOptions: IDisplayOptions = {
  show: {
    [Property.Resource]: [
      Resource.Project
    ]
  }
}

const FindItemResourceOptions: INodePropertyOptions[] = [
  {
    'name': PropertyDisplay.Project,
    'value': Resource.Project,
    'description': FindItemPropertyDisplay.FindProjectDescription
  }
]

const FindItemProjectOperationOptions: INodePropertyOptions[] = [
  {
    'name': FindItemPropertyDisplay.ByProjectId,
    'value': FindItemProperty.ProjectId,
    'description': FindItemPropertyDisplay.ByProjectIdDescription
  },
  {
    'name': FindItemPropertyDisplay.ByColumnId,
    'value': FindItemProperty.ColumnId,
    'description': FindItemPropertyDisplay.ByColumnIdDescription
  }
]

//#endregion

//#region Operation Mapping

interface IOperationMapping {
  [key: string]: (
    this: IHookFunctions | IExecuteFunctions,
    credentials: ICredentialDataDecryptedObject,
    itemIndex?: number
  ) => Promise<IFindItemBaseResponse | IFindItemErrorResponse>;
}

interface IResourceOperationMapping {
  [key: string]: IOperationMapping
}

export const FindItemOperationMapping: IResourceOperationMapping = {
  [Resource.Project]: {
    [FindItemProperty.ProjectId]: operationFindProjectByProjectId,
    [FindItemProperty.ColumnId]: operationFindProjectByColumnId,
  }
}

//#endregion

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
    displayName: FindItemPropertyDisplay.FindProject,
    name: Property.Resource,
    description: FindItemPropertyDisplay.FindProject,
    displayOptions: {},
    type: NodeTypes.Options,
    options: FindItemResourceOptions
  },
  [Property.Operation]: {
    ...FintItemConfigElementBase,
    displayName: FindItemPropertyDisplay.Operation,
    name: Property.Operation,
    description: FindItemPropertyDisplay.OperationDescriptipn,
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
