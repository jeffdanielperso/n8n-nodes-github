import { Property } from "../../Common/Enums";
import { IErrorResponse } from "../../Common/Interfaces";
import { IActionIssueResponse } from "./ActionResponses.issue";
import { IActionProjectResponse } from "./ActionResponses.project";

export interface IActionBaseResponse {
  [Property.Resource]: string;
  [Property.Operation]: string;
}

export interface IActionErrorResponse extends IActionBaseResponse, IErrorResponse {}

export type IActionResponse = IActionIssueResponse | IActionProjectResponse | IActionErrorResponse;
