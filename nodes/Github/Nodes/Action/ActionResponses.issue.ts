import { Property, Resource } from "../../Common/Enums";
import { IErrorResponse } from "../../Common/Interfaces";
import { IActionBaseResponse, IActionErrorResponse } from "./ActionResponses";

export enum ActionIssueResponseKey {
  LabelsToAdd = 'labels-to-add',
  LabelsToRemove = 'labels-to-remove',
  LabelToRemove = 'label-to-remove'
}

export const ActionIssueBaseResponse = {
  [Property.Resource]: Resource.Issue
}

export interface IActionIssueAddLabelsResponse extends IActionBaseResponse {
  [ActionIssueResponseKey.LabelsToAdd]: string;
}

export interface IActionIssueUpdateLabelsResponse extends IActionIssueAddLabelsResponse {
  [ActionIssueResponseKey.LabelsToRemove]: string;
}

export interface IActionIssueRemoveLabelResponse extends IActionBaseResponse {
  [ActionIssueResponseKey.LabelToRemove]: string;
}

export type IActionIssueResponse = 
  IActionIssueUpdateLabelsResponse | 
  IActionIssueAddLabelsResponse |
  IActionIssueRemoveLabelResponse |
  IActionErrorResponse;
