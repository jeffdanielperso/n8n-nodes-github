import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { Resource } from "../../Common/Enums";
import { FindItemProperty } from "./FindItemEnums";
import { operationFindProjectByColumnId, operationFindProjectByProjectId } from "./FindItemOperations";
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
    [FindItemProperty.ProjectId]: operationFindProjectByProjectId,
    [FindItemProperty.ColumnId]: operationFindProjectByColumnId,
  }
}
