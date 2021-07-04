import { Property, Resource } from "../../Common/Enums";
import { IErrorResponse } from "../../Common/Interfaces";
import { IIssue } from "../../Issue/IssueEntities";
import { IProject } from "../../Project/ProjectEntities";

interface IFindItemBaseResponse {
  [Property.Resource]: string,
  [Property.Operation]: string
}

export interface IFindItemErrorResponse extends IFindItemBaseResponse, IErrorResponse { }

export interface IFindItemProjectResponse extends IFindItemBaseResponse {
  [Resource.Project]: IProject
}

export interface IFindItemIssueResponse extends IFindItemBaseResponse {
  [Resource.Issue]: IIssue
}

export type IFindItemResponse = 
  IFindItemBaseResponse |
  IFindItemProjectResponse | 
  IFindItemIssueResponse |
  IFindItemErrorResponse;
