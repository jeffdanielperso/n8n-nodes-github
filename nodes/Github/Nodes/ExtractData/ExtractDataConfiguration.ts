import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { NodeTypes, Property, PropertyDisplay } from '../../Common/Enums';
import { IConfigurationMap } from '../../Common/Interfaces';
import {
  ExtractDataOperation,
  ExtractDataProperty,
  ExtractDataPropertyDisplay
} from './ExtractDataEnums';

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

const ExtractDataElementBase: INodeProperties = {
  displayName: '',
  name: '',
  type: NodeTypes.String,
  default: '',
  required: true
}

const ExtractDataConfig: IConfigurationMap = {
  [Property.Operation]: {
    ...ExtractDataElementBase,
    displayName: PropertyDisplay.Operation,
    name: Property.Operation,
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
        [Property.Operation]: [
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
        [Property.Operation]: [
          ExtractDataOperation.ProjectCard
        ]
      }
    },
  }
}

export const ExtractDataConfiguration = [
  ExtractDataConfig[Property.Operation],
  ExtractDataConfig[ExtractDataProperty.Object],
  ExtractDataConfig[ExtractDataProperty.Url]
]
