import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { ActionIssueOperation } from "./ActionEnums";
import {
  operationActionIssueAddLabels,
  operationActionIssueRemoveLabel,
  operationActionIssueUpdateLabels
} from "./ActionOperations.issue";
import { IActionIssueResponse } from "./ActionResponses.issue";

export interface IActionIssueOperationMapping {
  [key: string]: (
    this: IHookFunctions | IExecuteFunctions,
    credentials: ICredentialDataDecryptedObject,
    owner: string,
    repository: string,
    issueNumber: number,
    itemIndex?: number
  ) => Promise<IActionIssueResponse>;
}

export const ActionIssueOperationMapping: IActionIssueOperationMapping = {
  [ActionIssueOperation.UpdateLabels]: operationActionIssueUpdateLabels,
  [ActionIssueOperation.AddLabels]: operationActionIssueAddLabels,
  [ActionIssueOperation.RemoveLabel]: operationActionIssueRemoveLabel
}
