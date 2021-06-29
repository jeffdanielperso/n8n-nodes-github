import _ = require('lodash');
import { IHookFunctions, IExecuteFunctions } from 'n8n-core';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { Resource } from '../Common/Enums';
import { getArrayFromNodeParameter } from '../Common/GenericFunctions';
import { updateLabelsOfIssue } from './IssueActions';
import { IssueProperty, IssuePropertyDisplay } from './IssueConfiguration';
import { addLabelsToIssue, removeLabelOfIssue } from './IssueRequests';
import { IIssueOperationAddLabelsResponse, IIssueOperationRemoveLabelResponse, IIssueOperationUpdateLabelsResponse } from './IssueResponses';

export async function operationUpdateLabels(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  issueNumber: number
): Promise<IIssueOperationUpdateLabelsResponse> {
  const labelsToAdd = getArrayFromNodeParameter.call(this, IssueProperty.LabelsToAdd, 0);
  const labelsToRemove = getArrayFromNodeParameter.call(this, IssueProperty.LabelsToRemove, 0);

  const response = await updateLabelsOfIssue.call(
    this,
    credentials,
    owner,
    repository,
    issueNumber,
    labelsToAdd,
    labelsToRemove);

    return {
      "resource": Resource.Issue,
      "operation": IssuePropertyDisplay.OperationUpdateLabels,
      "add-labels": labelsToAdd.toString(),
      "remove-labels": labelsToRemove.toString(),
      "response": response
    };
}

export async function operationAddLabels(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  issueNumber: number
): Promise<IIssueOperationAddLabelsResponse> {
  const labelsToAdd = getArrayFromNodeParameter.call(this, IssueProperty.LabelsToAdd, 0);

  const response = await addLabelsToIssue.call(
    this,
    credentials,
    owner,
    repository, 
    issueNumber,
    labelsToAdd);

  return {
    "resource": Resource.Issue,
    "operation": IssuePropertyDisplay.OperationAddLabels,
    "add-labels": labelsToAdd.toString(),
    "response": response
  };
}

export async function operationRemoveLabel(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  issueNumber: number
): Promise<IIssueOperationRemoveLabelResponse> {
  const labelToRemove = this.getNodeParameter(IssueProperty.LabelToRemove, 0) as string;
  const response = await removeLabelOfIssue.call(
    this,
    credentials,
    owner,
    repository,
    issueNumber,
    labelToRemove);

  return {
    "resource": Resource.Issue,
    "operation": IssuePropertyDisplay.OperationRemoveLabel,
    "remove-label": labelToRemove,
    "response": response
  };
}
