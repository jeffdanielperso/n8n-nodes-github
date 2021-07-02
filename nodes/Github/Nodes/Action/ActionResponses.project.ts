import { Property, Resource } from "../../Common/Enums";
import { IActionBaseResponse, IActionErrorResponse } from "./ActionResponses";

export enum ActionProjectResponseKey {
  Project = 'project',
  ColumnId = 'column-id'
}

export const ActionProjectBaseResponse = {
  [Property.Resource]: Resource.Project
}

export interface IActionProjectMoveCardResponse extends IActionBaseResponse {
  [ActionProjectResponseKey.Project]: string;
  [ActionProjectResponseKey.ColumnId]: number;
}


export type IActionProjectResponse = 
  IActionProjectMoveCardResponse | 
  IActionErrorResponse;
