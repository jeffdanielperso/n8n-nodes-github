import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeColor, NodeGroup, NodeIcon, NodeMain } from './Common/Configuration';
import { Property } from './Common/Enums';
import { prepareItem } from './Common/GenericFunctions';
import { ExtractDataConfiguration } from './Nodes/ExtractData/ExtractDataConfiguration';
import { ExtractDataNode, ExtractDataOperation } from './Nodes/ExtractData/ExtractDataEnums';
import { ExtractDataOperationMapping } from './Nodes/ExtractData/ExtractDataOperationMapping';
import { IExtractDataResponse } from './Nodes/ExtractData/ExtractDataResponses';

export class GithubExtractData implements INodeType {
  description: INodeTypeDescription = {
      displayName: ExtractDataNode.DisplayName,
      name: ExtractDataNode.Name,
      icon: NodeIcon,
      group: [ NodeGroup ],
      version: 1,
      description: ExtractDataNode.Description,
      defaults: {
        name: ExtractDataNode.DisplayName,
        color: NodeColor,
      },
      inputs: [ NodeMain ],
      outputs: [ NodeMain ],
      properties: ExtractDataConfiguration
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const length = items.length as unknown as number;

		let item: INodeExecutionData;
		for (let i = 0; i < length; i++) {
      item = items[i];
      const operation = this.getNodeParameter(Property.Operation, i) as ExtractDataOperation;

      const newItem = prepareItem<IExtractDataResponse>(
        item,
        ExtractDataNode.OutputName,
        ExtractDataOperationMapping[operation].call(this, i)
      );
      returnData.push(newItem);
    }
    return this.prepareOutputData(returnData);
  }
}
