import {
  IExtractDataColumnResponse,
  IExtractDataContentResponse,
  IExtractDataProjectCardResponse,
  IExtractDataProjectResponse
} from './ExtractDataResponses';
import { IHookFunctions, IExecuteFunctions } from 'n8n-core';
import { ExtractDataProperty, ExtractDataPropertyDisplay } from './ExtractDataConfiguration';
import { IProjectCard } from '../Project/ProjectEntities';
import { getRegexMatchOfColumnUrl, getRegexMatchOfContentUrl, getRegexMatchOfProjectUrl } from './ExtractDataActions';

const regexUrlNotMatch = 'Url does not match the attended pattern.';
const objectWrong = 'Object is not of the attended type.';

export function operationFromProjectUrl(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataProjectResponse {
  const url = this.getNodeParameter(ExtractDataProperty.Url, itemIndex) as string;

  const regexResult = getRegexMatchOfProjectUrl(url);
  if (regexResult) {
    return {
      'operation': ExtractDataPropertyDisplay.OperationProjectUrl,
      'projectId': parseInt(regexResult[1])
    }
  }

  return {
    'operation': ExtractDataPropertyDisplay.OperationProjectUrl,
    "projectId": -1,
    'error': regexUrlNotMatch
  }
}

export function operationFromColumnUrl(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataColumnResponse {
  const url = this.getNodeParameter(ExtractDataProperty.Url, itemIndex) as string;

  const regexResult = getRegexMatchOfColumnUrl(url);
  if (regexResult) {
    return {
      'operation': ExtractDataPropertyDisplay.OperationColumnUrl,
      "columnId": parseInt(regexResult[1])
    }
  }

  return {
    'operation': ExtractDataPropertyDisplay.OperationColumnUrl,
    "columnId": -1,
    'error': regexUrlNotMatch
  }
}

export function operationFromContentUrl(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataContentResponse {
  const url = this.getNodeParameter(ExtractDataProperty.Url, itemIndex) as string;
 
  const regexResult = getRegexMatchOfContentUrl(url);
  if (regexResult) {
    return {
      'operation': ExtractDataPropertyDisplay.OperationContentUrl,
      'owner': regexResult[1],
      'repository': regexResult[2],
      'contentId': parseInt(regexResult[3])
    }
  }

  return {
    'operation': ExtractDataPropertyDisplay.OperationContentUrl,
    'owner': "",
    'repository': "",
    'contentId': -1,
    'error': regexUrlNotMatch
  }
}

export function operationFromProjectCard(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataProjectCardResponse {
  const projectCard = this.getNodeParameter(ExtractDataProperty.Object, itemIndex) as IProjectCard;

  if (projectCard) {
    const regexProjectResult = getRegexMatchOfProjectUrl(projectCard.project_url);
    const regexColumnResult = getRegexMatchOfProjectUrl(projectCard.column_url);
    const regexContentResult = getRegexMatchOfProjectUrl(projectCard.content_url);

    if (regexProjectResult && regexColumnResult && regexContentResult) {
      return {
        'operation': ExtractDataPropertyDisplay.OperationProjectCard,
        'projectId': parseInt(regexProjectResult[1]),
        'columnId': parseInt(regexColumnResult[1]),
        'owner': regexContentResult[1],
        'repository': regexContentResult[2],
        'contentId': parseInt(regexContentResult[3]),
      }
    }
  }

  return {
    'operation': ExtractDataPropertyDisplay.OperationProjectCard,
    'projectId': -1,
    'columnId': -1,
    'contentId': -1,
    'owner': '',
    'repository': '',
    'error': objectWrong
  }
}
