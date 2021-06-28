import { IExecuteFunctions } from 'n8n-core';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { ProjectOperation, ProjectProperty, ProjectType } from './ProjectConfiguration';
import { IProjectOperationMoveCard, operationMoveCard } from './ProjectOperations';

export async function orchestrateProjectOperation(
  this: IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject
): Promise<IProjectOperationMoveCard | undefined> {
  const operation = this.getNodeParameter(ProjectProperty.Operation, 0) as ProjectOperation;
  const projectName = this.getNodeParameter(ProjectProperty.Name, 0) as string;
  const projectType = this.getNodeParameter(ProjectProperty.Type, 0) as ProjectType;

  if (operation === ProjectOperation.MoveCard) {
    return await operationMoveCard.call(this, credentials, projectType, projectName);
  }
}
