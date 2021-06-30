import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeIcon } from './Common/Configuration';
import { prepareItem } from './Common/GenericFunctions';
import { ExtractFromUriConfiguration, ExtractFromUriNode, ExtractFromUriOperation, ExtractFromUriProperty } from './ExtractFromUri/ExtractFromUriConfiguration';
import { operationFromColumnUrl, operationFromContentUrl, operationFromProjectUrl } from './ExtractFromUri/ExtractFromUriOperations';
import { IExtractFromUriResponse } from './ExtractFromUri/ExtractFromUriResponses';

export class GithubExtractFromUri implements INodeType {
  description: INodeTypeDescription = {
      displayName: ExtractFromUriNode.DisplayName,
      name: ExtractFromUriNode.Name,
      icon: NodeIcon,
      group: ['transform'],
      version: 1,
      description: ExtractFromUriNode.Description,
      defaults: {
          name: ExtractFromUriNode.DisplayName,
          color: '#1A82e2',
      },
      inputs: ['main'],
      outputs: ['main'],
      properties: [
        ...ExtractFromUriConfiguration
      ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const length = items.length as unknown as number;

		let item: INodeExecutionData;
		for (let i = 0; i < length; i++) {
      item = items[i];
      const operation = this.getNodeParameter(ExtractFromUriProperty.Operation, i) as ExtractFromUriOperation;
      const url = this.getNodeParameter(ExtractFromUriProperty.Url, i) as string;

      let result: IExtractFromUriResponse;
      if (operation === ExtractFromUriOperation.ProjectUrl) {
        result = operationFromProjectUrl(url);
      } else if (operation === ExtractFromUriOperation.ColumnUrl) {
        result = operationFromColumnUrl(url);
      } else if (operation === ExtractFromUriOperation.ContentUrl) {
        result = operationFromContentUrl(url);
      }

      const newItem = prepareItem<IExtractFromUriResponse>(
        item,
        ExtractFromUriNode.OutputName,
        result
      );

      returnData.push(newItem);
    }

    return this.prepareOutputData(returnData);
  }
}
