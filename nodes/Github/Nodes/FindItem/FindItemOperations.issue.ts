import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { getRegexMatchOfContentUrl } from "../ExtractData/ExtractDataActions";
import { IFindItemErrorResponse, IFindItemIssueResponse, IFindItemResponse } from "./FindItemResponse";
import { FindItemPropertyDisplay } from "./FindItemEnums";
import { prepareErrorResult } from "../../Common/GenericFunctions";
import { Property, Resource } from "../../Common/Enums";
import { FindItemIssueProperty, FindItemIssuePropertyDisplay } from "./FindItemEnums.issue";
import { getIssue } from "../../Issue/IssueRequests";

const ErrorGettingIssue = 'Could not retrieve the Issue';
const ErrorGettingContentUrl = 'Could not retrieve Content URL';
const ErrorGettingParameters = 'Could not retrieve Parameters';

export async function operationFindIssueByContentUrl(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  itemIndex: number = 0
): Promise<IFindItemIssueResponse | IFindItemErrorResponse> {
  const resultBase: IFindItemResponse = {
    [Property.Resource]: FindItemPropertyDisplay.IssueDescription,
    [Property.Operation]: FindItemIssuePropertyDisplay.ByContentUrl
  };
  const contentUrl = this.getNodeParameter(FindItemIssueProperty.ContentUrl, itemIndex) as string;
  const regexResult = getRegexMatchOfContentUrl(contentUrl);
  if (regexResult) {
    const owner = regexResult[1];
    const repository = regexResult[2];
    const contentId = parseInt(regexResult[3]);

    const issue = await getIssue.call(this, credentials, owner, repository, contentId);
    if (issue) {
      return {
        ...resultBase,
        [Resource.Issue]: issue
      } as IFindItemIssueResponse;
    }
    return prepareErrorResult(resultBase, ErrorGettingIssue);
  } 
  return prepareErrorResult(resultBase, ErrorGettingContentUrl);
}

export async function operationFindIssueByOwnerRepoNumber(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  itemIndex: number = 0
): Promise<IFindItemIssueResponse | IFindItemErrorResponse> {
  const resultBase: IFindItemResponse = {
    [Property.Resource]: FindItemPropertyDisplay.IssueDescription,
    [Property.Operation]: FindItemIssuePropertyDisplay.ByOwnerRepoNumber
  };

  const owner = this.getNodeParameter(FindItemIssueProperty.Owner, itemIndex) as string;
  const repository = this.getNodeParameter(FindItemIssueProperty.Repository, itemIndex) as string;
  const issueNumber = this.getNodeParameter(FindItemIssueProperty.IssueNumber, itemIndex) as number;

  if (owner && repository && issueNumber) {
    const issue = await getIssue.call(this, credentials, owner, repository, issueNumber);
    if (issue) {
      return {
        ...resultBase,
        [Resource.Issue]: issue
      } as IFindItemIssueResponse;
    }
    return prepareErrorResult(resultBase, ErrorGettingIssue);
  }
  return prepareErrorResult(resultBase, ErrorGettingParameters);
}
