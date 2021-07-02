import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { ProjectType, Property, Resource } from "../../Common/Enums";
import { ActionIssueProperty, ActionProjectProperty } from "./ActionEnums";
import { ActionIssueOperationMapping } from "./ActionOperationMapping.issue";
import { ActionProjectOperationMapping } from "./ActionOperationMapping.project";
import { IActionErrorResponse, IActionResponse } from "./ActionResponses";

const ErrorResourceNotHandled = 'Type of Resource not handled';

export async function actionOrchestration(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  itemIndex: number = 0
): Promise<IActionResponse> {
  const resource = this.getNodeParameter(Property.Resource, itemIndex) as string;
  const operation = this.getNodeParameter(Property.Operation, itemIndex) as string;

  let response;
  if (resource === Resource.Issue) {
    const owner = this.getNodeParameter(ActionIssueProperty.Owner, itemIndex) as string;
    const repository = this.getNodeParameter(ActionIssueProperty.Repository, itemIndex) as string;
    const issueNumber = this.getNodeParameter(ActionIssueProperty.IssueNumber, itemIndex) as number;

    response = await ActionIssueOperationMapping[operation].call(
      this,
      credentials,
      owner,
      repository,
      issueNumber,
      itemIndex
    );
  } else if (resource === Resource.Project) {
    const projectType = this.getNodeParameter(ActionProjectProperty.Type, itemIndex) as ProjectType;
    const projectName = this.getNodeParameter(ActionProjectProperty.Name, itemIndex) as string;

    response = await ActionProjectOperationMapping[operation].call(
      this,
      credentials,
      projectType,
      projectName,
      itemIndex
    );
  }

  return response ?? {
    error: ErrorResourceNotHandled
  } as IActionErrorResponse;
}
