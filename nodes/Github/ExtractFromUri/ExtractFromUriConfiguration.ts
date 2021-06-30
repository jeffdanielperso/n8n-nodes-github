import { INodeProperties } from "n8n-workflow"
import { PropertyDisplay } from "../Common/Enums"
import { IConfigurationMap } from "../Common/Interfaces"

//#region 

export enum ExtractFromUriNode {
  Name = 'githubExtractFromUri',
  DisplayName = 'Github Extract From Uri',
  Description = 'Extract data from Uri',
  OutputName = 'github-extract-from-uri'
}

export enum ExtractFromUriOperation {
  ProjectUrl = 'extractFromUri_fromProjectUrl',
  ColumnUrl = 'extractFromUri_fromColumnUrl',
  ContentUrl = 'extractFromUri_fromContentUrl'
}

export enum ExtractFromUriProperty {
  Operation = 'extractFromUri_operation',
  Url = 'extractFromUri_url',
}

const enum ExtractFromUriPropertyDisplay {
  OperationProjectUrl = 'From Project URL',
  OperationProjectUrlDescription = 'Extract data from Project URL',
  OperationColumnUrl = 'From Column URL',
  OperationColumnUrlDescription = 'Extract data from Column URL',
  OperationContentUrl = 'From Content URL',
  OperationContentUrlDescription = 'Extract data from Content URL',
  Url = 'URL',
}

//#endregion

//#region Options

const ExtractFromUriOperationOptions = [
  {
    name: ExtractFromUriPropertyDisplay.OperationProjectUrl,
    value: ExtractFromUriOperation.ProjectUrl,
    description: ExtractFromUriPropertyDisplay.OperationProjectUrlDescription,
  },
  {
    name: ExtractFromUriPropertyDisplay.OperationColumnUrl,
    value: ExtractFromUriOperation.ColumnUrl,
    description: ExtractFromUriPropertyDisplay.OperationColumnUrlDescription,
  },
  {
    name: ExtractFromUriPropertyDisplay.OperationContentUrl,
    value: ExtractFromUriOperation.ContentUrl,
    description: ExtractFromUriPropertyDisplay.OperationContentUrlDescription,
  }
]

//#endregion

const ExtractFromUriElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: 'string',
  default: '',
  required: true
}

const ExtractFromUriConfig: IConfigurationMap = {
  [ExtractFromUriProperty.Operation]: {
    ...ExtractFromUriElementBase,
    displayName: PropertyDisplay.Operation,
    name: PropertyDisplay.Operation,
    description: PropertyDisplay.Operation,
    type: 'options',
    options: ExtractFromUriOperationOptions
  },
  [ExtractFromUriProperty.Url]: {
    ...ExtractFromUriElementBase,
    displayName: ExtractFromUriPropertyDisplay.Url,
    name: ExtractFromUriProperty.Url,
    description: ExtractFromUriProperty.Url
  }
}

export const ExtractFromUriConfiguration = [
  ExtractFromUriConfig[ExtractFromUriProperty.Operation],
  ExtractFromUriConfig[ExtractFromUriProperty.Url]
]
