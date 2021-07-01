import {
  IExtractDataBaseResponse,
  IExtractDataColumnResponse,
  IExtractDataContentResponse,
  IExtractDataErrorResponse,
  IExtractDataProjectCardResponse,
  IExtractDataProjectResponse
} from './ExtractDataResponses';
import {
  getRegexMatchOfColumnUrl,
  getRegexMatchOfContentUrl,
  getRegexMatchOfProjectUrl
} from './ExtractDataActions';
import { IHookFunctions, IExecuteFunctions } from 'n8n-core';
import { IProjectCard } from '../../Project/ProjectEntities';
import { ExtractDataProperty, ExtractDataPropertyDisplay } from './ExtractDataEnums';
import { prepareErrorResult } from '../../Common/GenericFunctions';

const regexUrlNotMatch = 'Url does not match the attended pattern.';
const objectWrong = 'Object is not of the attended type.';

export function operationFromProjectUrl(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataProjectResponse | IExtractDataErrorResponse {
  const resultBase = {
    operation: ExtractDataPropertyDisplay.OperationProjectUrl
  } as IExtractDataBaseResponse;
  const url = this.getNodeParameter(ExtractDataProperty.Url, itemIndex) as string;

  const regexResult = getRegexMatchOfProjectUrl(url);
  if (regexResult) {
    return {
      ...resultBase,
      projectId: parseInt(regexResult[1])
    }
  }
  return prepareErrorResult(resultBase, regexUrlNotMatch);
}

export function operationFromColumnUrl(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataColumnResponse | IExtractDataErrorResponse {
  const resultBase = {
    operation: ExtractDataPropertyDisplay.OperationColumnUrl
  } as IExtractDataBaseResponse;
  const url = this.getNodeParameter(ExtractDataProperty.Url, itemIndex) as string;

  const regexResult = getRegexMatchOfColumnUrl(url);
  if (regexResult) {
    return {
      ...resultBase,
      columnId: parseInt(regexResult[1])
    }
  }
  return prepareErrorResult(resultBase, regexUrlNotMatch);
}

export function operationFromContentUrl(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataContentResponse | IExtractDataErrorResponse {
  const resultBase = {
    operation: ExtractDataPropertyDisplay.OperationContentUrl
  } as IExtractDataBaseResponse;
  const url = this.getNodeParameter(ExtractDataProperty.Url, itemIndex) as string;
 
  const regexResult = getRegexMatchOfContentUrl(url);
  if (regexResult) {
    return {
      ...resultBase,
      owner: regexResult[1],
      repository: regexResult[2],
      contentId: parseInt(regexResult[3])
    }
  }
  return prepareErrorResult(resultBase, regexUrlNotMatch);
}

export function operationFromProjectCard(
  this: IHookFunctions | IExecuteFunctions,
  itemIndex: number = 0
): IExtractDataProjectCardResponse | IExtractDataErrorResponse {
  const resultBase = {
    operation: ExtractDataPropertyDisplay.OperationProjectCard
  } as IExtractDataBaseResponse;
  const projectCard = this.getNodeParameter(ExtractDataProperty.Object, itemIndex) as IProjectCard;

  if (projectCard) {
    const regexProjectResult = getRegexMatchOfProjectUrl(projectCard.project_url);
    const regexColumnResult = getRegexMatchOfColumnUrl(projectCard.column_url);
    const regexContentResult = getRegexMatchOfContentUrl(projectCard.content_url);

    if (regexProjectResult && regexColumnResult && regexContentResult) {
      return {
        ...resultBase,
        projectId: parseInt(regexProjectResult[1]),
        columnId: parseInt(regexColumnResult[1]),
        owner: regexContentResult[1],
        repository: regexContentResult[2],
        contentId: parseInt(regexContentResult[3]),
      }
    }
  }
  return prepareErrorResult(resultBase, objectWrong);
}
