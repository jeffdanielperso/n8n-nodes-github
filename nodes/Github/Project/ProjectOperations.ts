import { IHookFunctions, IExecuteFunctions } from 'n8n-core';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { findProject, moveOrCreateIssueCardInColumn } from './ProjectActions';
import { ProjectProperty, ProjectPropertyDisplay, ProjectType } from './ProjectConfiguration';

export interface IProjectOperationMoveCard {
  "type": string;
  "project": string;
  "columnId": number;
  "response": object;
}

export async function operationMoveCard(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  projectType: ProjectType,
  projectName: string
): Promise<IProjectOperationMoveCard | undefined> {
  const matchingProject = await findProject.call(this, credentials, projectType, projectName);
  if (matchingProject) {
    const issueNumber = this.getNodeParameter(ProjectProperty.IssueNumber, 0) as number;
    const destinationColumnId = this.getNodeParameter(ProjectProperty.ColumnId, 0) as number;

    const response = await moveOrCreateIssueCardInColumn.call(
      this,
      credentials,
      matchingProject.id,
      projectType,
      issueNumber,
      destinationColumnId
    );

    const result: IProjectOperationMoveCard = {
      "type": ProjectPropertyDisplay.OperationMoveCard,
      "project": matchingProject.name,
      "columnId": destinationColumnId,
      "response": response
    };

    return result;
  }
}
