import { INodeProperties } from "n8n-workflow";
import { IConfigurationMap } from "../Common/Interfaces";

//#region Enums

export enum FindProjectPropertyDisplay {
  ColumnId = 'Column ID'
}

export enum FindProjectProperty {
  ColumnId = 'FindProject_columnId'
}

//#endregion

const FindProjectConfig: IConfigurationMap = {
  [FindProjectProperty.ColumnId]: {
    displayName: FindProjectPropertyDisplay.ColumnId,
    name: FindProjectProperty.ColumnId,
    type: 'number',
    default: '',
    required: true
  }
}

export const FindProjectConfiguration: INodeProperties[] = [
  FindProjectConfig[FindProjectProperty.ColumnId],
]
