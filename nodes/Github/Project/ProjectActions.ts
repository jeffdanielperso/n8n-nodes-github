import { IHookFunctions, IExecuteFunctions } from 'n8n-core';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { ProjectMovePosition, ProjectType, YesNo } from '../Common/Enums';
import { IIssue } from '../Issue/IssueEntities';
import { getIssue } from '../Issue/IssueRequests';
import { ActionProjectProperty } from '../Nodes/Action/ActionEnums';
import { IProject, IProjectCard, IProjectColumn } from './ProjectEntities';
import {
  createCard,
  getCardsOfColumn,
  getColumns,
  getOrganizationProjects,
  getRepositoryProjects,
  getUserProjects,
  moveCard
} from './ProjectRequests';

export async function findOrganizationalProject(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  projectName: string
): Promise<IProject | undefined> {
  const response = await getOrganizationProjects.call(this, credentials, owner) as IProject[];
  return response.find(project => project.name.toLocaleLowerCase() === projectName.toLocaleLowerCase());
}

export async function findRepositoryProject(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  owner: string,
  repository: string,
  projectName: string
): Promise<IProject | undefined> {
  const response = await getRepositoryProjects.call(this, credentials, owner, repository) as IProject[];
  return response.find(project => project.name.toLocaleLowerCase() === projectName.toLocaleLowerCase());
}

export async function findUserProject(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  user: string,
  projectName: string
): Promise<IProject | undefined> {
  const response = await getUserProjects.call(this, credentials, user) as IProject[];
  return response.find(project => project.name.toLocaleLowerCase() === projectName.toLocaleLowerCase());
}

export async function FindItem(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  projectType: ProjectType,
  projectName: string
): Promise<IProject | undefined> {
  if (projectType === ProjectType.Organization) {
    const owner = this.getNodeParameter(ActionProjectProperty.Owner, 0) as string;
    return await findOrganizationalProject.call(this, credentials, owner, projectName) as IProject;
  } else if (projectType === ProjectType.Repository) {
    const owner = this.getNodeParameter(ActionProjectProperty.Owner, 0) as string;
    const repository = this.getNodeParameter(ActionProjectProperty.Repository, 0) as string;
    return await findRepositoryProject.call(this, credentials, owner, repository, projectName) as IProject;
  } else if (projectType === ProjectType.User) {
    const user = this.getNodeParameter(ActionProjectProperty.Owner, 0) as string;
    return await findUserProject.call(this, credentials, user, projectName) as IProject;
  }

  return undefined;
}

export async function findIssueCardinProject(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  projectId: number,
  issueNumber: number
): Promise<IProjectCard | undefined> {
  const columns = await getColumns.call(this, credentials, projectId) as IProjectColumn[];
  for (const column of columns) {
    const matchingCard = await findIssueCardInColumn.call(this, credentials, column.id, issueNumber);
    if (matchingCard) {
      return matchingCard;
    }
  }

  return undefined;
}

export async function findIssueCardInColumn(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  columnId: number,
  issueNumber: number
): Promise<IProjectCard | undefined> {
  const cards = await getCardsOfColumn.call(this, credentials, columnId) as IProjectCard[];
  const matchingCard = cards.find(card => 
    {
      return
        card &&
        card['content_url'] &&
        card['content_url']?.split('/')[7] === issueNumber.toString();
    });
  if (matchingCard) {
    return matchingCard;
  }

  return undefined;
}

export async function moveOrCreateIssueCardInColumn(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
  projectId: number,
  projectType: ProjectType,
  issueNumber: number,
  columnId: number,
  movePosition: ProjectMovePosition = ProjectMovePosition.Bottom,
  itemIndex: number = 0
): Promise<any> {
  const matchingCard = await findIssueCardinProject.call(this, credentials, projectId, issueNumber);
  if (matchingCard) {
    return await moveCard.call(this, credentials, matchingCard.id, columnId, movePosition);
  } else {
    const owner = this.getNodeParameter(ActionProjectProperty.Owner, itemIndex) as string;
    const knownIssueId = this.getNodeParameter(ActionProjectProperty.KnownIssueId, itemIndex) as YesNo;
    let issueId: number | undefined;

    if (knownIssueId === YesNo.Yes) {
      issueId = this.getNodeParameter(ActionProjectProperty.IssueId, itemIndex) as number;
    } else if (knownIssueId === YesNo.No) {
      let repository: string;
      if (projectType === ProjectType.Repository) {
        repository = this.getNodeParameter(ActionProjectProperty.Repository, itemIndex) as string;
      } else {
        repository = this.getNodeParameter(ActionProjectProperty.IssueRepository, itemIndex) as string;
      }

      const issue = await getIssue.call(this, credentials, owner, repository, issueNumber) as IIssue;
      issueId = issue.id;
    }

    if (issueId) {
      return await createCard.call(this, credentials, columnId, issueId);
    }
  }
}
