import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { getRegexMatchOfProjectUrl } from "../ExtractData/ExtractDataActions";
import { getColumn, getProject } from "../../Project/ProjectRequests";
import { IFindItemErrorResponse, IFindItemProjectResponse, IFindItemResponse } from "./FindItemResponse";
import { FindItemPropertyDisplay } from "./FindItemEnums";
import { prepareErrorResult } from "../../Common/GenericFunctions";
import { Property, Resource } from "../../Common/Enums";
import { FindItemProjectProperty, FindItemProjectPropertyDisplay } from "./FindItemEnums.project";

const ErrorGettingProjectId = 'Could not retrieve Project ID';
const ErrorGettingProject = 'Could not retrieve the Project';
const ErrorGettingColumnId = 'Could not retrieve Column ID';
const ErrorGettingColumn = 'Could not retrieve the Column';

export async function operationFindProjectByProjectId(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  itemIndex: number = 0
): Promise<IFindItemProjectResponse | IFindItemErrorResponse> {
  const resultBase: IFindItemResponse = {
    [Property.Resource]: FindItemPropertyDisplay.ProjectDescription,
    [Property.Operation]: FindItemProjectPropertyDisplay.ByProjectId
  };

  const projectId = this.getNodeParameter(FindItemProjectProperty.ProjectId, itemIndex) as number;
  if (projectId) {
    const project = await getProject.call(this, credentials, projectId);
    if (project) {
      return {
        ...resultBase,
        [Resource.Project]: project
      } as IFindItemProjectResponse;
    }
    return prepareErrorResult(resultBase, ErrorGettingProject);
  }
  return prepareErrorResult(resultBase, ErrorGettingProjectId);
}

export async function operationFindProjectByColumnId(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  itemIndex: number = 0
): Promise<IFindItemProjectResponse | IFindItemErrorResponse> {
  const resultBase: IFindItemResponse = {
    [Property.Resource]: FindItemPropertyDisplay.ProjectDescription,
    [Property.Operation]: FindItemProjectPropertyDisplay.ByColumnId
  };
  const columnId = this.getNodeParameter(FindItemProjectProperty.ColumnId, itemIndex) as number;
  if (columnId) {
    const column = await getColumn.call(this, credentials, columnId);
    if (column) {
      const regexpResult = getRegexMatchOfProjectUrl(column.project_url);
      if (regexpResult) {
        const projectId = parseInt(regexpResult[1]);
        const project = await getProject.call(this, credentials, projectId);
        if (project) {
          return {
            ...resultBase,
            [Resource.Project]: project
          } as IFindItemProjectResponse;
        }
        return prepareErrorResult(resultBase, ErrorGettingProject);
      }
    }
    return prepareErrorResult(resultBase, ErrorGettingColumn);
  }
  return prepareErrorResult(resultBase, ErrorGettingColumnId);
}
