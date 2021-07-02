import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { Property } from "../../Common/Enums";
import { getArrayFromNodeParameter, prepareErrorResult } from "../../Common/GenericFunctions";
import { updateLabelsOfIssue } from "../../Issue/IssueActions";
import { addLabelsToIssue, removeLabelOfIssue } from "../../Issue/IssueRequests";
import { ActionIssueProperty, ActionIssuePropertyDisplay } from "./ActionEnums";
import { IActionErrorResponse } from "./ActionResponses";
import {
  ActionIssueBaseResponse,
  ActionIssueResponseKey,
  IActionIssueAddLabelsResponse,
  IActionIssueRemoveLabelResponse,
  IActionIssueUpdateLabelsResponse
} from "./ActionResponses.issue";

export async function operationActionIssueUpdateLabels(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  issueNumber: number,
  itemIndex: number = 0
): Promise<IActionIssueUpdateLabelsResponse | IActionErrorResponse> {
  const resultBase = {
    ...ActionIssueBaseResponse,
    [Property.Operation]: ActionIssuePropertyDisplay.UpdateLabels
  };

  try {
    const labelsToAdd = getArrayFromNodeParameter.call(this, ActionIssueProperty.LabelsToAdd, itemIndex);
    const labelsToRemove = getArrayFromNodeParameter.call(this, ActionIssueProperty.LabelsToRemove, itemIndex);

    await updateLabelsOfIssue.call(
      this,
      credentials,
      owner,
      repository,
      issueNumber,
      labelsToAdd,
      labelsToRemove);
    
    return {
      ...resultBase,
      [ActionIssueResponseKey.LabelsToAdd]: labelsToAdd.toString(),
      [ActionIssueResponseKey.LabelsToRemove]: labelsToRemove.toString()
    };

  } catch (error) {
    return prepareErrorResult(resultBase, error.toString());
  }
}

export async function operationActionIssueAddLabels(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  issueNumber: number,
  itemIndex: number = 0
  ): Promise<IActionIssueAddLabelsResponse | IActionErrorResponse> {
  const resultBase = {
    ...ActionIssueBaseResponse,
    [Property.Operation]: ActionIssuePropertyDisplay.AddLabels
  };

  try {
    const labelsToAdd = getArrayFromNodeParameter.call(this, ActionIssueProperty.LabelsToAdd, itemIndex);

    await addLabelsToIssue.call(
      this,
      credentials,
      owner,
      repository, 
      issueNumber,
      labelsToAdd);
    
    return {
      ...resultBase,
      [ActionIssueResponseKey.LabelsToAdd]: labelsToAdd.toString(),
    };

  } catch (error) {
    return prepareErrorResult(resultBase, error.toString());
  }
}

export async function operationActionIssueRemoveLabel(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  issueNumber: number,
  itemIndex: number = 0
  ): Promise<IActionIssueRemoveLabelResponse | IActionErrorResponse> {
  const resultBase = {
    ...ActionIssueBaseResponse,
    [Property.Operation]: ActionIssuePropertyDisplay.AddLabels
  };

  try {
    const labelToRemove = this.getNodeParameter(ActionIssueProperty.LabelToRemove, itemIndex) as string;

    await removeLabelOfIssue.call(
      this,
      credentials,
      owner,
      repository,
      issueNumber,
      labelToRemove);

    return {
      ...resultBase,
      [ActionIssueResponseKey.LabelToRemove]: labelToRemove,
    };
  } catch (error) {
    return prepareErrorResult(resultBase, error.toString());
  }
}
