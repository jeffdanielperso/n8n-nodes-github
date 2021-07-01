import { Resource } from "../Common/Enums";
import { IErrorResponse } from "../Common/Interfaces";
import { IProject } from "../Project/ProjectEntities";

export interface IFindItemBaseResponse {
  'operation': string,
  'parameter': string,
}

export interface IFindItemErrorResponse extends IFindItemBaseResponse, IErrorResponse { }

export interface IFindItemProjectResponse extends IFindItemBaseResponse {
  [Resource.Project]: IProject
}
