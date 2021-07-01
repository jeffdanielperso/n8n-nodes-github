import { Resource } from "../../Common/Enums";
import { IErrorResponse } from "../../Common/Interfaces";
import { IProject } from "../../Project/ProjectEntities";

interface IFindItemBaseResponse {
  'operation': string,
  'parameter': string
}

export interface IFindItemErrorResponse extends IFindItemBaseResponse, IErrorResponse { }

export interface IFindItemProjectResponse extends IFindItemBaseResponse {
  [Resource.Project]: IProject
}

export type IExtractDataResponse = 
  IFindItemProjectResponse | 
  IFindItemErrorResponse;
