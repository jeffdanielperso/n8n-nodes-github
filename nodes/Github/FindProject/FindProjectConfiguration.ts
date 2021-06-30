import { INodeProperties } from "n8n-workflow";
import { NodeTypes } from "../Common/Enums";
import { IConfigurationMap } from "../Common/Interfaces";

//#region Enums

export enum FindProjectNode {
  Name = 'githubFindProject',
  DisplayName = 'Github Find Project',
  Description = 'Github Find Project from Column',
  OutputName = 'github-find-project'
}

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
    type: NodeTypes.Number,
    default: '',
    required: true
  }
}

export const FindProjectConfiguration: INodeProperties[] = [
  FindProjectConfig[FindProjectProperty.ColumnId],
]
