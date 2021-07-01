import { Property, Resource } from "../../Common/Enums";
import { IErrorResponse } from "../../Common/Interfaces";
import { IProject } from "../../Project/ProjectEntities";

interface IFindItemBaseResponse {
  [Property.Operation]: string,
  [Property.Parameter]: string
}

export interface IFindItemErrorResponse extends IFindItemBaseResponse, IErrorResponse { }

export interface IFindItemProjectResponse extends IFindItemBaseResponse {
  [Resource.Project]: IProject
}

export type IFindItemResponse = 
  IFindItemBaseResponse |
  IFindItemProjectResponse | 
  IFindItemErrorResponse;
