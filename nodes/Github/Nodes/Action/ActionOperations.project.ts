import { IExecuteFunctions, IHookFunctions } from "n8n-core";
import { ICredentialDataDecryptedObject } from "n8n-workflow";
import { ProjectType, Property } from "../../Common/Enums";
import { prepareErrorResult } from "../../Common/GenericFunctions";
import { FindItem, moveOrCreateIssueCardInColumn } from "../../Project/ProjectActions";
import { ActionProjectProperty, ActionProjectPropertyDisplay } from "./ActionEnums";
import { IActionErrorResponse } from "./ActionResponses";
import {
  ActionProjectBaseResponse,
  ActionProjectResponseKey,
  IActionProjectMoveCardResponse
} from "./ActionResponses.project";

const ErrorMatchingProject = 'Could not find the matching Project';

export async function operationActionProjectMoveCard(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  projectType: ProjectType,
  projectName: string,
  itemIndex: number = 0
): Promise<IActionProjectMoveCardResponse | IActionErrorResponse> {
  const resultBase = {
    ...ActionProjectBaseResponse,
    [Property.Operation]: ActionProjectPropertyDisplay.MoveCard
  }

  let step = 1;
  try {
    const matchingProject = await FindItem.call(this, credentials, projectType, projectName);
    step = 2;
    if (matchingProject) {
      step = 3;
      const issueNumber = this.getNodeParameter(ActionProjectProperty.IssueNumber, itemIndex) as number;
      step = 4;
      const destinationColumnId = this.getNodeParameter(ActionProjectProperty.ColumnId, itemIndex) as number;
      step = 5;

      const response = await moveOrCreateIssueCardInColumn.call(
        this,
        credentials,
        matchingProject.id,
        projectType,
        issueNumber,
        destinationColumnId
      );
      step = 6;

      return {
        ...resultBase,
        [ActionProjectResponseKey.Project]: matchingProject.name,
        [ActionProjectResponseKey.ColumnId]: destinationColumnId
      }
    }
    return prepareErrorResult(resultBase, ErrorMatchingProject);
  }
  catch (error) {
    return prepareErrorResult(resultBase, `step ${step} - ${error.toString()}`);
  }
}
