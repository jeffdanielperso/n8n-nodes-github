import { OptionsWithUri } from 'request';
import { IExecuteFunctions, IHookFunctions } from 'n8n-core';
import { ICredentialDataDecryptedObject, IDataObject, INodeExecutionData, NodeApiError } from 'n8n-workflow';
import * as _ from 'lodash';
import { HttpMethod } from './HttpMethod';
import { IErrorResponse, IValueData } from './Interfaces';

export function copyItem(item: INodeExecutionData): INodeExecutionData {
  const newItem: INodeExecutionData = {
    json: JSON.parse(JSON.stringify(item.json))
  }
  if (item.binary !== undefined) {
    newItem.binary = item.binary;
  }

  return newItem;
}

export function prepareErrorResult<TInput, TOutput extends TInput | IErrorResponse>(
  resultBase: TInput,
  error: string
): TOutput {
  return {
    ...resultBase,
    error: error
  } as TOutput
}
export function prepareItem<T>(
  item: INodeExecutionData,
  output: string,
  value: T): INodeExecutionData {
  const newItem = copyItem(item);

  newItem.json[output] = getOrCreateArrayAndPush<T>(
    newItem.json[output] as T[] | undefined,
    value);

  return newItem;
}

export function getOrCreateArrayAndPush<T>(
  item: T[] | undefined,
  value: T
): T[] {
  const array = item ?? [];
  array.push(value);
  return array;
}

export function getArrayFromNodeParameter(
  this: IHookFunctions | IExecuteFunctions,
  parameterName: string,
  itemIndex: number,
  fallbackValue?: []): any[] {
  const node = this.getNodeParameter(parameterName, itemIndex, {}) as IDataObject;
  if (node && node.parameter) {
    const labelCollection = node.parameter as IValueData[];
    if (labelCollection) {
      return labelCollection.map(item => item!.value);
    }
  }

  return fallbackValue ?? [];
}

/**
 * Make an API request to Github
 *
 * @param {IHookFunctions} this
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns {Promise<any>}
 */
 export async function githubRequest(
  this: IHookFunctions | IExecuteFunctions,
  credentials: ICredentialDataDecryptedObject,
   method: HttpMethod,
   endpoint: string,
   body: object,
   query?: object,
   option: IDataObject = {}
  ): Promise<any> { // tslint:disable-line:no-any

	const options: OptionsWithUri = {
		method,
		headers: {
			'User-Agent': 'n8n-jeffdanielperso',
      'Accept': 'application/vnd.github.inertia-preview+json'
		},
		body,
		qs: query,
		uri: '',
		json: true,
	};

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	try {
    const baseUrl = credentials!.server || 'https://api.github.com';
    options.uri = `${baseUrl}${endpoint}`;
    //@ts-ignore
    return await this.helpers.requestOAuth2.call(this, 'oAuth2Api', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
