import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { Resource } from "../../Common/Enums";
import { FindItemIssueOperation } from "./FindItemEnums.issue";
import { FindItemProjectOperation } from "./FindItemEnums.project";
import { operationFindIssueByContentUrl, operationFindIssueByOwnerRepoNumber } from "./FindItemOperations.issue";
import { operationFindProjectByColumnId, operationFindProjectByProjectId } from "./FindItemOperations.project";
import { IFindItemErrorResponse, IFindItemResponse } from "./FindItemResponse";

interface IOperationMapping {
  [key: string]: (
    this: IHookFunctions | IExecuteFunctions,
    credentials: ICredentialDataDecryptedObject,
    itemIndex?: number
  ) => Promise<IFindItemResponse | IFindItemErrorResponse>;
}

interface IResourceOperationMapping {
  [key: string]: IOperationMapping
}

export const FindItemOperationMapping: IResourceOperationMapping = {
  [Resource.Project]: {
    [FindItemProjectOperation.ByProjectId]: operationFindProjectByProjectId,
    [FindItemProjectOperation.ByColumnId]: operationFindProjectByColumnId,
  },
  [Resource.Issue]: {
    [FindItemIssueOperation.ByContentUrl]: operationFindIssueByContentUrl,
    [FindItemIssueOperation.ByOwnerRepoNumber]: operationFindIssueByOwnerRepoNumber
  }
}
