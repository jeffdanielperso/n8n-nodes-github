import { IExecuteFunctions, IHookFunctions } from 'n8n-core';
import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { NodeTypes, PropertyDisplay } from '../Common/Enums';
import { IConfigurationMap } from '../Common/Interfaces';
import { operationFromColumnUrl, operationFromContentUrl, operationFromProjectCard, operationFromProjectUrl } from './ExtractDataOperations';
import { IExtractDataResponse } from './ExtractDataResponses';

//#region Enums

export enum ExtractDataNode {
  Name = 'githubExtractData',
  DisplayName = 'Github Extract Data',
  Description = 'Extract data from Payload',
  OutputName = 'github-extract-data'
}

export enum ExtractDataOperation {
  ProjectCard = 'extractData_fromProjectCard',
  ProjectUrl = 'extractData_fromProjectUrl',
  ColumnUrl = 'extractData_fromColumnUrl',
  ContentUrl = 'extractData_fromContentUrl'
}

export enum ExtractDataProperty {
  Operation = 'extractData_operation',
  Object = 'extractData_object',
  Url = 'extractData_url',
}

export const enum ExtractDataPropertyDisplay {
  OperationProjectCard = 'From Project Card',
  OperationProjectCardDescription = 'Extract data from Project Card',
  OperationProjectUrl = 'From Project URL',
  OperationProjectUrlDescription = 'Extract data from Project URL (Project ID)',
  OperationColumnUrl = 'From Column URL',
  OperationColumnUrlDescription = 'Extract data from Column URL (Column ID)',
  OperationContentUrl = 'From Content URL',
  OperationContentUrlDescription = 'Extract data from Content URL (Owner, Repository, Content Number)',
  Object = 'Object',
  Url = 'URL',
}

//#endregion

//#region Options

const ExtractDataOperationOptions: INodePropertyOptions[] = [
  {
    name: ExtractDataPropertyDisplay.OperationProjectCard,
    value: ExtractDataOperation.ProjectCard,
    description: ExtractDataPropertyDisplay.OperationProjectCardDescription
  },
  {
    name: ExtractDataPropertyDisplay.OperationProjectUrl,
    value: ExtractDataOperation.ProjectUrl,
    description: ExtractDataPropertyDisplay.OperationProjectUrlDescription,
  },
  {
    name: ExtractDataPropertyDisplay.OperationColumnUrl,
    value: ExtractDataOperation.ColumnUrl,
    description: ExtractDataPropertyDisplay.OperationColumnUrlDescription,
  },
  {
    name: ExtractDataPropertyDisplay.OperationContentUrl,
    value: ExtractDataOperation.ContentUrl,
    description: ExtractDataPropertyDisplay.OperationContentUrlDescription,
  }
]

//#endregion

//#region Operation Mapping

interface IOperationMapping {
  [key: string]: (this: IHookFunctions | IExecuteFunctions, itemIndex?: number) => IExtractDataResponse;
}

export const ExtractDataOperationMapping: IOperationMapping = {
  [ExtractDataOperation.ProjectCard]: operationFromProjectCard ,
  [ExtractDataOperation.ProjectUrl]: operationFromProjectUrl,
  [ExtractDataOperation.ColumnUrl]: operationFromColumnUrl,
  [ExtractDataOperation.ContentUrl]: operationFromContentUrl
}

//#endregion

const ExtractDataElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.String,
  default: '',
  required: true
}

const ExtractDataConfig: IConfigurationMap = {
  [ExtractDataProperty.Operation]: {
    ...ExtractDataElementBase,
    displayName: PropertyDisplay.Operation,
    name: ExtractDataProperty.Operation,
    description: PropertyDisplay.Operation,
    type: NodeTypes.Options,
    options: ExtractDataOperationOptions,
    default: ExtractDataOperation.ProjectUrl
  },
  [ExtractDataProperty.Object]: {
    ...ExtractDataElementBase,
    displayName: ExtractDataPropertyDisplay.Object,
    name: ExtractDataProperty.Object,
    description: ExtractDataProperty.Object,
    displayOptions: {
      show: {
        [ExtractDataProperty.Operation]: [
          ExtractDataOperation.ProjectCard
        ]
      }
    }
  },
  [ExtractDataProperty.Url]: {
    ...ExtractDataElementBase,
    displayName: ExtractDataPropertyDisplay.Url,
    name: ExtractDataProperty.Url,
    description: ExtractDataProperty.Url,
    displayOptions: {
      hide: {
        [ExtractDataProperty.Operation]: [
          ExtractDataOperation.ProjectCard
        ]
      }
    },
  }
}

export const ExtractDataConfiguration = [
  ExtractDataConfig[ExtractDataProperty.Operation],
  ExtractDataConfig[ExtractDataProperty.Object],
  ExtractDataConfig[ExtractDataProperty.Url]
]
